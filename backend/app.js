const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/clubes', require('./routes/club.routes'));

// Acá se van a registrar tus rutas
// app.use('/api/clubes', require('./routes/club.routes'));

app.get('/', (req, res) => {
  res.send('FootData API está funcionando');
});

module.exports = app;
