require('dotenv').config();
const axios = require('axios');
const db = require('../models');

const Jugador = db.Jugador;
const JugadorDatoExtra = db.JugadorDatoExtra;

async function syncLogrosJugador(jugador) {
  try {
    const res = await axios.get(`http://localhost:8000/players/${jugador.id}/achievements`);
    const achievements = res.data.achievements;

    const logros = [];

    achievements.forEach(a => {
      a.details?.forEach(detail => {
        logros.push({
          titulo: a.title,
          anio: detail.season?.name || 'Desconocido',
          equipo: detail.club?.name || 'Desconocido'
        });
      });
    });

    await JugadorDatoExtra.upsert({
      jugador_id: jugador.id,
      tipo: 'logros',
      datos: logros
    });

    console.log(`✅ Logros de ${jugador.nombre} actualizados`);
  } catch (err) {
    console.error(`❌ Error logros de ${jugador.nombre}:`, err.message);
  }
}

async function main() {
  const jugadores = await Jugador.findAll();
  for (const jugador of jugadores) {
    await syncLogrosJugador(jugador);
    await new Promise(res => setTimeout(res, 100));
  }

  console.log('\n✅ Sincronización de logros finalizada');
  process.exit(0);
}

main();
