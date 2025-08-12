import React from 'react';
import './EstadisticasJugador.css';
import { FaFutbol, FaClock } from 'react-icons/fa';
import { GiSoccerKick } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';

const EstadisticasJugador = ({ datos }) => {
  if (!datos) return null;

  return (
    <div className="estadisticas-jugador-container">
      <h1>Estadísticas {datos.competencia} - {datos.temporada} </h1>
      <div className="estadisticas-grid">
        <div><BsFillPersonFill className="icono" /> <span>Apariciones:</span> {datos.apariciones}</div>
        <div><FaFutbol className="icono" /> <span>Goles:</span> {datos.goles}</div>
        <div><GiSoccerKick className="icono" /> <span>Asistencias:</span> {datos.asistencias}</div>
        <div><FaClock className="icono" /> <span>Minutos:</span> {datos.minutos}</div>
        <div className="icono-img">
        <img src="/icons/tarjeta-amarilla.png" alt="Tarjeta amarilla" />
        <span>Amarillas:</span> {datos.amarillas}
        </div>
        <div className="icono-img">
        <img src="/icons/tarjeta-roja.png" alt="Tarjeta roja" />
        <span>Rojas:</span> {datos.rojas}
        </div>
      </div>
    </div>
  );
};

export default EstadisticasJugador;
