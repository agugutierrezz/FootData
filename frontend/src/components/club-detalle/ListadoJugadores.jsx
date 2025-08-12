import React from 'react';
import './ListadoJugadores.css';
import { useNavigate } from 'react-router-dom';

const ListadoJugadores = ({ jugadores }) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.src = '/images/default.png';
  };

  const handleClick = (id) => {
    navigate(`/jugador/${id}/perfil`);
  };

  return (
    <div className="listado-jugadores">
      <table>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id} className='tabla-jugadores'>
              <td>
                <img
                  src={`/${jugador.imagen_url}`}
                  alt={jugador.nombre}
                  onError={handleImageError}
                  className="imagen-jugador"
                  onClick={() => handleClick(jugador.id)}
                />
              </td>
              <td>
                <span
                  className="nombre-jugador"
                  onClick={() => handleClick(jugador.id)}
                >
                  {jugador.nombre}
                </span>
              </td>
              <td>{jugador.posicion}</td>
              <td>{jugador.edad}</td>
              <td>{jugador.nacionalidades?.join(', ')}</td>
              <td>{jugador.valor_mercado ? `$${jugador.valor_mercado.toLocaleString()}` : 'N/D'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoJugadores;
