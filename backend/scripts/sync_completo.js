const { exec } = require('child_process');

const scripts = [
  'sync_clubes.js',
  'sync_club_perfil.js',
  'sync_jugadores.js'
];

function ejecutarScript(index = 0) {
  if (index >= scripts.length) {
    console.log('Sincronización completa.');
    return;
  }

  const script = scripts[index];
  console.log(`Ejecutando ${script}...`);

  exec(`node scripts/${script}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error ejecutando ${script}:`, err.message);
      return;
    }

    console.log(stdout);
    ejecutarScript(index + 1);
  });
}

ejecutarScript();
