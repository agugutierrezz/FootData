require('dotenv').config();
const axios = require('axios');
const db = require('../models');
const Competicion = db.Competicion;

const esInternacional = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];
const terminos = ['Liga', 'Argentina', 'Libertadores', 'Champions', 'Sudamericana'];

async function syncCompeticiones() {
  try {
    for (const termino of terminos) {
      const res = await axios.get(`https://transfermarkt-api.fly.dev/competitions/search/${termino}?page_number=1`);
      const competiciones = res.data.results;

      for (const c of competiciones) {
        const tipo = esInternacional.includes(c.continent?.toUpperCase()) ? 'INTERNACIONAL' : 'NACIONAL';

        const cloudinaryUrl = `https://res.cloudinary.com/dqfjxktou/image/upload/v1752802221/${c.id}.png`;

        const [comp, created] = await Competicion.findOrCreate({
          where: { codigo: c.id },
          defaults: {
            nombre: c.name,
            codigo: c.id,
            continente: c.continent,
            pais: c.country,
            tipo: tipo,
            imagen_url: cloudinaryUrl,
            temporada: null
          }
        });

        if (created) {
          console.log(`Competición cargada: ${c.name} (${c.id})`);
        } else {
          console.log(`Ya existía: ${c.name}`);
        }
      }
    }
    console.log('Sincronización completada.');
    process.exit(0);
  } catch (err) {
    console.error('Error general:', err.message);
    process.exit(1);
  }
}

syncCompeticiones();


