import React from 'react';
import './ClubInfo.css';

const ClubInfo = ({ club }) => {
  if (!club) return null;
  return (
    <div className="club-info">
      <h2>{club.nombre}</h2>
      <img
        src={`http://localhost:3000/${club.imagen_url}`}
        alt="Escudo"
      />
      <div className='datos'>
        <h3>INFORMACION</h3>
        <ul>
          <li><b>País:</b> {club.pais}</li>
          <li><b>Fundado:</b> {club.fundacion}</li>
          <li><b>Estadio:</b> {club.estadio}</li>
          <li><b>Valor:</b> ${club.valor_plantel}</li>
          <li><b>Técnico:</b> </li>
        </ul>
      </div>
    </div>
  );
};

export default ClubInfo;



