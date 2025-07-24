require('dotenv').config();
const axios = require('axios');
const path = require('path');
const db = require('../models');
const Club = db.Club;
const Jugador = db.Jugador;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Normaliza nombre del club para usar en el nombre de carpeta
function normalizarNombre(nombre) {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[^a-zA-Z0-9]/g, "_"); // reemplaza caracteres especiales por _
}

async function retryAxios(url, maxRetries = 2, delayMs = 500) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await axios.get(url);
      return res;
    } catch (err) {
      if (err.response && err.response.status === 503) {
        console.warn(`[${attempt}/${maxRetries}] 503 para ${url}. Reintentando en ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        throw err;
      }
    }
  }

  throw new Error(`Se agotaron los reintentos para ${url}`);
}

async function syncJugadoresClubes() {
    const clubes = await Club.findAll()

    for (const club of clubes) {
      try {
        const res = await retryAxios(`http://localhost:8000/clubs/${club.codigo}/players`);
        const jugadores = res.data.players;

        const nombreClub = normalizarNombre(club.nombre);

        for (const j of jugadores) {
          const imagenLocal = path.join('images', 'jugadores', nombreClub, `${j.id}.png`);

          await Jugador.upsert({
            id: j.id,
            nombre: j.name,
            imagen_url: imagenLocal.replace(/\\/g, '/'),
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

        console.log(`✅ Jugadores sincronizados para: ${club.nombre}`);
      } catch (err) {
        console.error(`❌ Error al obtener jugadores de ${club.nombre}: ${err.message}`);
      }

      await delay(1000); // espera entre clubes
    }

    console.log('✅ Sincronización de jugadores completada.');
    process.exit(0);
  }

syncJugadoresClubes();