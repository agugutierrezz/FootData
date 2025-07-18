require('dotenv').config();
const axios = require('axios');
const db = require('../models');
const Club = db.Club;

async function syncPerfilesClubes() {
  try {
    const clubes = await Club.findAll();

    for (const club of clubes) {
      try {
        const res = await axios.get(`https://transfermarkt-api.fly.dev/clubs/${club.codigo}/profile`);
        const p = res.data;

        await club.update({
          estadio: p.stadiumName || null,
          fundacion: p.foundedOn ? new Date(p.foundedOn).getFullYear() : null,
          valor_plantel: p.currentMarketValue || null,
          liga: p.league?.name || null,
          pais: p.league?.countryName || null
        });

        console.log(`Perfil actualizado: ${club.nombre}`);
      } catch (err) {
        console.error(`Error al obtener perfil de ${club.nombre}: ${err.message}`);
      }
    }

    console.log('Sincronización de perfiles completada.');
    process.exit(0);
  } catch (err) {
    console.error('Error general:', err.message);
    process.exit(1);
  }
}

syncPerfilesClubes();
