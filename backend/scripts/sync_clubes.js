require('dotenv').config();
const axios = require('axios');
const db = require('../models');
const Competicion = db.Competicion;
const Club = db.Club;

// Espera N milisegundos entre cada iteración
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function syncClubesPorCompeticion() {
  try {
    const competiciones = await Competicion.findAll();

    for (const comp of competiciones) {
      console.log(`Procesando clubes para: ${comp.nombre} (${comp.codigo})`);

      try {
        const res = await axios.get(`https://transfermarkt-api.fly.dev/competitions/${comp.codigo}/clubs`);
        const clubes = res.data.clubs;

        if (!Array.isArray(clubes)) {
          console.warn(`No se pudo leer clubes de ${comp.codigo}`);
          continue;
        }

        for (const c of clubes) {
          const imagenCloudinary = `https://res.cloudinary.com/dqfjxktou/image/upload/v1752806068/${c.id}.png`;

          const [club, created] = await Club.findOrCreate({
            where: { codigo: c.id },
            defaults: {
              nombre: c.name,
              imagen_url: imagenCloudinary,
              codigo: c.id,
              competicion_id: comp.id 
            }
          });

          if (created) {
            console.log(`Club cargado: ${c.name}`);
          } else {
            console.log(`Club ya existente: ${c.name}`);
          }
        }
      } catch (err) {
        console.error(`Error con competición ${comp.codigo}: ${err.message}`);
      }

      // Esperar 1 segundo antes de la siguiente petición a la API
      await delay(1000);
    }

    console.log('Sincronización de clubes completada.');
    process.exit(0);
  } catch (err) {
    console.error('Error general:', err.message);
    process.exit(1);
  }
}

syncClubesPorCompeticion();
