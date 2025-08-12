require('dotenv').config();
const axios = require('axios');
const db = require('../models');

const Jugador = db.Jugador;
const JugadorDatoExtra = db.JugadorDatoExtra;

async function syncEstadisticasJugador(jugador) {
  const jugadorId = jugador.id;

  // Verificar si ya tiene datos de estadística cargados
  const existente = await JugadorDatoExtra.findOne({
    where: {
      jugador_id: jugadorId,
      tipo: 'estadistica'
    }
  });

  if (existente) {
    console.log(`ℹ️ ${jugador.nombre} ya tenía estadísticas cargadas`);
    return;
  }

  let intentos = 0;
  const maxIntentos = 5;

  while (intentos < maxIntentos) {
    try {
      const res = await axios.get(`http://localhost:8000/players/${jugadorId}/stats`);
      const stats = res.data.stats;

      if (!stats || stats.length === 0) {
        console.warn(`⚠️ Sin estadísticas para ${jugador.nombre}`);
        break;
      }

      // Obtener la más reciente (mayor seasonId)
      const ultima = stats.reduce((a, b) => parseInt(b.seasonId) >= parseInt(a.seasonId) ? b : a);

      const datosEstadisticas = {
        competencia: ultima.competitionName || 'Desconocida',
        temporada: ultima.seasonId || 'Desconocida',
        apariciones: ultima.appearances || 0,
        goles: ultima.goals || 0,
        asistencias: ultima.assists || 0,
        amarillas: ultima.yellowCards || 0,
        rojas: ultima.redCards || 0,
        minutos: ultima.minutesPlayed || 0
      };

      await JugadorDatoExtra.upsert({
        jugador_id: jugadorId,
        tipo: 'estadistica',
        datos: datosEstadisticas
      });

      console.log(`✅ Estadísticas de ${jugador.nombre} actualizadas`);
      break;

    } catch (err) {
      intentos++;
      console.error(`❌ Falló ${jugador.nombre} (${jugadorId}), intento ${intentos} (${err.message})`);
      await new Promise(res => setTimeout(res, 150));
    }
  }

  if (intentos === maxIntentos) {
    console.warn(`⛔️ Se omitió a ${jugador.nombre} tras ${maxIntentos} intentos fallidos.`);
  }
}

async function main() {
  const jugadores = await Jugador.findAll();
  for (const jugador of jugadores) {
    await syncEstadisticasJugador(jugador);
    await new Promise(res => setTimeout(res, 100));
  }

  console.log('\n✅ Sincronización de estadísticas finalizada');
  process.exit(0);
}

main();
