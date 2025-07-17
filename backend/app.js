const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/clubes', require('./routes/club.routes'));
app.use('/api/competiciones', require('./routes/competicion.routes'));
app.use('/api/fechas', require('./routes/fecha.routes'));
app.use('/api/formaciones', require('./routes/formacion.routes'));
app.use('/api/jugadores', require('./routes/jugador.routes'));
app.use('/api/partidos', require('./routes/partido.routes'));


app.get('/', (req, res) => {
  res.send('FootData API está funcionando');
});

module.exports = app;
