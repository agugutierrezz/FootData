import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormacionNueva.css';
import BotonVolver from "../components/BotonVolver";

function FormacionNueva() {
  const [clubes, setClubes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/clubes')
      .then(res => res.json())
      .then(data => setClubes(data))
      .catch(err => console.error("Error al cargar clubes:", err));
  }, []);

  const clubesFiltrados = clubes
    .filter(c => c.nombre.toLowerCase().includes(filtro.toLowerCase()))
    .sort((a, b) => b.valor_plantel - a.valor_plantel);

  return (
    <div className="crear-formacion-container">
      <BotonVolver />
      <h1 className="crear-formacion-titulo">SELECCIONÁ UN CLUB PARA ARMAR TU 11</h1>
      <input
        type="text"
        placeholder="Buscar club..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="crear-formacion-buscador"
      />
      <div className="crear-formacion-grid">
        {clubesFiltrados.map(club => (
          <div
            key={club.id}
            className="crear-formacion-card"
            onClick={() => navigate(`/formacion/crear/${club.id}`)}
          >
            <img src={`/${club.imagen_url}`} alt={club.nombre} />
            <p>{club.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormacionNueva;

