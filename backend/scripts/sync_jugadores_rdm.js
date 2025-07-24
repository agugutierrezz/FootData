require('dotenv').config();
const axios = require('axios');
const path = require('path');
const db = require('../models');
const Jugador = db.Jugador;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

const jugadoresBuscar = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Karim Benzema",
  "Neymar",
  "Viktor Gyokeres",
  "Luis Suarez",
  "Sergio Busquets",
  "Jordi Alba",
  "Nicolas Otamendi",
  "James Rodriguez",
  "Marco Reus"
];

async function syncJugadoresPorBusqueda() {
  for (const nombreJugador of jugadoresBuscar) {
    try {
      const res = await retryAxios(`http://localhost:8000/players/search/${encodeURIComponent(nombreJugador)}?page_number=1`);
      const jugador = res.data.results?.[0];

      if (!jugador) {
        console.warn(`⚠️ No se encontró ningún jugador para "${nombreJugador}"`);
        continue;
      }

      const imagenLocal = path.join('images', 'jugadores', 'Resto_del_Mundo', `${jugador.id}.png`);

      await Jugador.upsert({
        id: jugador.id,
        nombre: jugador.name,
        imagen_url: imagenLocal.replace(/\\/g, '/'),
        posicion: jugador.position,
        fecha_nacimiento: jugador.dateOfBirth,
        edad: jugador.age,
        nacionalidades: jugador.nationality,
        altura: jugador.height,
        pie: jugador.foot,
        contrato: jugador.contract,
        valor_mercado: jugador.marketValue,
        club_id: 9999
      });

      console.log(`✅ Jugador sincronizado: ${jugador.name}`);

    } catch (err) {
      console.error(`❌ Error con "${nombreJugador}": ${err.message}`);
    }

    await delay(1000);
  }

  console.log("✅ Sincronización completada.");
  process.exit(0);
}

syncJugadoresPorBusqueda();
