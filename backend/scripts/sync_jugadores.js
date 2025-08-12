require('dotenv').config();
const axios = require('axios');
const db = require('../models');

const Club = db.Club;
const Jugador = db.Jugador;

// Términos de ligas "válidas"
const TERM_LIST = [
  'Torneo Apertura', 'Torneo Clausura', 'Libertadores', 'Champions',
  'Premier League', 'LaLiga', 'Ligue1', 'Serie A', 'Bundesliga'
];

// --- Helpers ---
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * GET con reintentos para 503 y 500 (backoff exponencial).
 * maxRetries elevado para cubrir intermitencias de 500/503.
 */
async function retryGet(url, { maxRetries = 8, baseDelayMs = 400 } = {}) {
  let attempt = 0;
  while (true) {
    try {
      return await axios.get(url);
    } catch (err) {
      const status = err.response?.status;
      if ((status === 500 || status === 503) && attempt < maxRetries) {
        attempt++;
        const wait = baseDelayMs * Math.pow(2, attempt - 1); // 400, 800, 1600, ...
        console.warn(`⚠️ [${attempt}/${maxRetries}] ${status} en ${url}. Reintentando en ${wait}ms...`);
        await sleep(wait);
        continue;
      }
      // Otros errores o agotados reintentos
      throw err;
    }
  }
}

function ligaIncluyeTermino(liga = '') {
  const l = (liga || '').toLowerCase();
  return TERM_LIST.some(t => l.includes(t.toLowerCase()));
}

async function run() {
  try {
    // 1) Cargo todos los clubes (necesitamos id, codigo y liga)
    const clubes = await Club.findAll({
      attributes: ['id', 'nombre', 'liga', 'codigo'],
      order: [['id', 'ASC']]
    });

    // Map rápido: codigo(string) -> { id, nombre, liga }
    const clubPorCodigo = new Map();
    for (const c of clubes) {
      const codigo = (c.codigo ?? '').toString().trim();
      if (codigo) {
        clubPorCodigo.set(codigo, { id: c.id, nombre: c.nombre, liga: c.liga || '' });
      }
    }

    let totalProcesados = 0;
    let totalActualizados = 0;
    let totalA9999 = 0;
    let totalIguales = 0;
    let totalSinJugador = 0;

    // 2) Por cada club con "codigo", traigo sus jugadores desde la API
    for (const [codigo, clubDB] of clubPorCodigo.entries()) {
      const url = `http://localhost:8000/clubs/${codigo}/players`;

      let res;
      try {
        res = await retryGet(url); // maneja 500/503 con reintentos
      } catch (err) {
        console.error(`❌ No se pudo obtener jugadores para club codigo=${codigo} (${clubDB.nombre}): ${err.message}`);
        // Sigo con el siguiente club
        continue;
      }

      const players = res.data?.players || [];
      console.log(`➡️  Club ${clubDB.nombre} (${codigo}) → ${players.length} jugadores`);

      // 3) Para cada jugador listado en este club
      for (const p of players) {
        const jugadorId = parseInt(p.id, 10);
        if (Number.isNaN(jugadorId)) {
          continue;
        }

        totalProcesados++;

        // Traigo el jugador desde la DB
        const jugador = await Jugador.findByPk(jugadorId, { attributes: ['id', 'nombre', 'club_id'] });
        if (!jugador) {
          totalSinJugador++;
          // No está en DB (quizás lo cargarás en otro sync). Seguimos.
          continue;
        }

        // Si ya está en este club, no hay nada que hacer
        if (jugador.club_id === clubDB.id) {
          totalIguales++;
          continue;
        }

        // Si cambió de club, decido según la liga del club objetivo
        if (!ligaIncluyeTermino(clubDB.liga)) {
          // Liga fuera de los términos → mandar a 9999
          await Jugador.update({ club_id: 9999 }, { where: { id: jugador.id } });
          totalA9999++;
          console.log(`⚠️ ${jugador.nombre} (${jugador.id}) → club_id 9999 (liga: "${clubDB.liga}")`);
        } else {
          // Liga aceptada → actualizar al nuevo club
          await Jugador.update({ club_id: clubDB.id }, { where: { id: jugador.id } });
          totalActualizados++;
          console.log(`✅ ${jugador.nombre} (${jugador.id}) → ${clubDB.nombre} (liga: "${clubDB.liga}")`);
        }

        // Respiro mínimo para no saturar I/O
        await sleep(50);
      }

      // Pausa corta entre clubes para no cargar la API
      await sleep(150);
    }

    console.log('——— Resumen ———');
    console.log(`Procesados: ${totalProcesados}`);
    console.log(`Sin jugador en DB: ${totalSinJugador}`);
    console.log(`Sin cambios (mismo club): ${totalIguales}`);
    console.log(`Actualizados a nuevo club: ${totalActualizados}`);
    console.log(`Mandados a 9999: ${totalA9999}`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error general:', err.message);
    process.exit(1);
  }
}

run();
