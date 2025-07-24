import React, { useEffect, useState } from 'react';
import getPosiciones from "../club-detalle/posicionesFormacion";
import './FormacionEditor.css';

import {  DndContext,  useDraggable,  useDroppable } from '@dnd-kit/core';


const FormacionEditor = ({ esquema, alineacion, setAlineacion, disponibles }) => {
  const [posiciones, setPosiciones] = useState([]);

  useEffect(() => {
    const pos = getPosiciones(esquema);
    setPosiciones(pos);

    setAlineacion(prev => {
      const nueva = Array(pos.length).fill(null);
      for (let i = 0; i < Math.min(pos.length, prev.length); i++) {
        nueva[i] = prev[i];
      }
      return nueva;
    });
  }, [esquema]);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const jugadorId = e.dataTransfer.getData('jugador_id');
    const jugador = disponibles.find(j => j.id.toString() === jugadorId);
    if (!jugador) return;

    setAlineacion(prev => {
      const nueva = [...prev];
      nueva[index] = jugador;
      return nueva;
    });
  };

  const handleRemove = (index) => {
    setAlineacion(prev => {
      const nueva = [...prev];
      nueva[index] = null;
      return nueva;
    });
  };

  return (
    <div className="formacion-editor">
      {posiciones.map((pos, index) => (
        <div
          key={index}
          className="player-slot"
          style={{ top: pos.top, left: pos.left }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          onClick={() => alineacion[index] && handleRemove(index)}
        >
          {alineacion[index] ? (
            <div className="jugador-en-campo-contenedor">
              <img
                src={`http://localhost:3000/${alineacion[index].imagen_url}`}
                alt={alineacion[index].nombre}
                className="jugador-en-campo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'http://localhost:3000/images/default.png';
                }}
              />
              <span className="jugador-nombre">{alineacion[index].nombre}</span>
            </div>
          ) : (
            <div className="slot-vacio"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormacionEditor;