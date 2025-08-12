import React, { useState, useEffect } from 'react';
import './AgregarRefuerzo.css';

const AgregarRefuerzo = ({ onAgregar, nacionalidad }) => {
  const [nombre, setNombre] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (nombre.length >= 2) {
        setLoading(true);
        fetch(`/api/jugadores?nombre=${nombre}`)
          .then(res => res.json())
          .then(data => {
            const normalize = (str) =>
              str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            
            let filtrados = data.filter(j =>
              normalize(j.nombre).includes(normalize(nombre))
            );

            // Filtrar por nacionalidad si se especifica
            if (nacionalidad) {
              filtrados = filtrados.filter(j =>
                j.nacionalidades?.includes(nacionalidad)
              );
            }

            filtrados.sort((a, b) => (b.valor_mercado || 0) - (a.valor_mercado || 0));
            setResultados(filtrados);
          })
          .catch(() => setResultados([]))
          .finally(() => setLoading(false));
      } else {
        setResultados([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [nombre, nacionalidad]);

  const seleccionarJugador = (jugador) => {
    onAgregar(jugador);
    setNombre('');
    setResultados([]);
  };

  return (
    <div className="agregar-refuerzo">
      <h3>{nacionalidad === 'Argentina' ? 'Convocar Jugador' : 'Agregar Refuerzo'}</h3>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder={nacionalidad === 'Argentina' ? 'Buscar jugador argentino...' : 'Buscar por nombre'}
        autoComplete="off"
      />
      {loading && <div className="loading">Buscando...</div>}
      {resultados.length > 0 && (
        <ul className="combo-resultados">
          {resultados.map(j => (
            <li key={j.id} onClick={() => seleccionarJugador(j)}>
              <img
                src={`/${j.imagen_url}`}
                alt={j.nombre}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/default.png';
                }}
              />
              <span>{j.nombre} – ({j.edad})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgregarRefuerzo;
