const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');

app.use((req, res, next) => {
  if (!req.cookies.user_token) {
    const token = uuidv4();
    res.cookie('user_token', token, { httpOnly: true, maxAge: 31536000000 });
    req.user_token = token;
  } else {
    req.user_token = req.cookies.user_token;
  }
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/clubes', require('./routes/club.routes'));
app.use('/api/competiciones', require('./routes/competicion.routes'));
app.use('/api/formaciones', require('./routes/formacion.routes'));
app.use('/api/jugadores', require('./routes/jugador.routes'));
app.use('/api/partidos', require('./routes/partido.routes'));
app.use('/api/search', require('./routes/search.routes'));

app.get('/', (req, res) => {
  res.send('FootData API está funcionando');
});




module.exports = app;
