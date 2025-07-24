require('dotenv').config();
const axios = require('axios');
const path = require('path');
const db = require('../models');
const Competicion = db.Competicion;
const Club = db.Club;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function syncClubesPorCompeticion() {
  try {
    const competiciones = await Competicion.findAll();

    for (const [i, comp] of competiciones.entries()) {
      console.log(`🔍 Procesando clubes para: ${comp.nombre} (${comp.codigo})`);

      try {
        const res = await axios.get(`http://localhost:8000/competitions/${comp.codigo}/clubs`);
        const clubes = res.data.clubs;

        if (!Array.isArray(clubes)) {
          console.warn(`⚠️ No se pudo leer clubes de ${comp.codigo}`);
          continue;
        }

        for (const c of clubes) {
          const imagenLocal = path.join('images', 'clubes', `${c.id}.png`);

          const [club, created] = await Club.findOrCreate({
            where: { codigo: c.id },
            defaults: {
              nombre: c.name,
              imagen_url: imagenLocal.replace(/\\/g, '/'),
              codigo: c.id,
              competicion_id: comp.id 
            }
          });

          if (created) {
            console.log(`✅ Club cargado: ${c.name}`);
          } else {
            console.log(`ℹ️ Club ya existente: ${c.name}`);
          }
        }
      } catch (err) {
        console.error(`❌ Error con competición ${comp.codigo}: ${err.message}`);
      }

      // Solo esperamos si hay más competiciones
      if (i < competiciones.length - 1) {
        await delay(1000);
      }
    }

    console.log('✅ Sincronización de clubes completada.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error general:', err.message);
    process.exit(1);
  }
}

syncClubesPorCompeticion();