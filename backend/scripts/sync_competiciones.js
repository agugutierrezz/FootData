require('dotenv').config(); 
const axios = require('axios');
const path = require('path');
const db = require('../models');
const Competicion = db.Competicion;

const terminos = [
  'Torneo Apertura', 'Torneo Clausura', 'Libertadores', 'Champions', 
  'Premier League', 'LaLiga', 'Ligue1', 'Serie A', 'Bundesliga'
];

// Ruta relativa base para las imágenes
const rutaImagenes = path.join('images', 'competiciones');

async function syncCompeticiones() {
  try {
    for (const termino of terminos) {
      const res = await axios.get(`http://localhost:8000/competitions/search/${encodeURIComponent(termino)}?page_number=1`);
      const competiciones = res.data.results;

      if (competiciones.length === 0) {
        console.log(`No se encontraron competiciones para: ${termino}`);
        continue;
      }

      const c = competiciones[0]; // tomar el primer resultado

      const imagenLocal = path.join(rutaImagenes, `${c.id}.png`);

      const [comp, created] = await Competicion.findOrCreate({
        where: { codigo: c.id },
        defaults: {
          nombre: c.name,
          codigo: c.id,
          continente: c.continent,
          pais: c.country,
          imagen_url: imagenLocal.replace(/\\/g, '/')
        }
      });

      if (created) {
        console.log(`✅ Competición cargada: ${c.name} (${c.id})`);
      } else {
        console.log(`ℹ️ Ya existía: ${c.name}`);
      }
    }

    console.log('✅ Sincronización completada.');
    process.exit(0);

  } catch (err) {
    console.error('❌ Error general:', err.message);
    process.exit(1);
  }
}

syncCompeticiones();