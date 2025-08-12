import React from 'react';
import './JugadorDisponible.css';

const JugadorDisponible = ({ jugador }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('jugador_id', jugador.id);
  };

  return (
    <div className="jugador-disponible" draggable onDragStart={handleDragStart}>
      <img
        src={`/${jugador.imagen_url}`}
        alt={jugador.nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/default.png';
        }}
      />
      <p>{jugador.nombre}</p>
    </div>
  );
};

export default JugadorDisponible;
