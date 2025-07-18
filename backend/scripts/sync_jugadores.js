require('dotenv').config();
const axios = require('axios');
const db = require('../models');
const Club = db.Club;
const Jugador = db.Jugador;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryAxios(url, maxRetries = 3, delayMs = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await axios.get(url);
      return res;
    } catch (err) {
      if (err.response && err.response.status === 503) {
        console.warn(`[${attempt}/${maxRetries}] 503 para ${url}. Reintendando en ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        throw err;
      }
    }
  }

  throw new Error(`Se agotaron los reintentos para ${url}`);
}

async function syncJugadoresClubes() {
  try {
    const clubes = await Club.findAll();

    for (const club of clubes) {
      try {
        const res = await retryAxios(`https://transfermarkt-api.fly.dev/clubs/${club.codigo}/players`);
        const jugadores = res.data.players;

        for (const j of jugadores) {
          const imagenCloudinary = `https://res.cloudinary.com/dqfjxktou/image/upload/v1752806068/${j.name}.png`;

          await Jugador.upsert({
            id: j.id,
            nombre: j.name,
            imagen_url: imagenCloudinary,
            posicion: j.position,
            fecha_nacimiento: j.dateOfBirth,
            edad: j.age,
            nacionalidades: j.nationality,
            altura: j.height,
            pie: j.foot,
            contrato: j.contract,
            valor_mercado: j.marketValue,
            club_id: club.id
          });
        }

        console.log(`Jugadores sincronizados para: ${club.nombre}`);
      } catch (err) {
        console.error(`Error al obtener jugadores de ${club.nombre}: ${err.message}`);
      }

      await delay(1000); // espera entre cada club
    }

    console.log('Sincronización de jugadores completada.');
    process.exit(0);
  } catch (err) {
    console.error('Error general:', err.message);
    process.exit(1);
  }
}

syncJugadoresClubes();




