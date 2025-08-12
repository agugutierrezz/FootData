import './ClubesDestacados.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ClubesDestacados() {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/clubes/clubes-destacados')
      .then(res => res.json())
      .then(data => {
        setClubes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener clubes destacados:', err);
        setLoading(false);
      });
  }, []);

  const handleClick = (club) => {
    navigate(`/club/${club.id}`);
  };

  if (loading) return <p className="text-center">Cargando clubes destacados...</p>;

  return (
    <div className="clubes-destacados-container">
      <h2>CLUBES DESTACADOS</h2>
      <div className="clubes-grid">
        {clubes.map((club) => (
          <div key={club.id} className="club-card" onClick={() => handleClick(club)}>
            <img src={club.imagen_url} alt={club.nombre} />
            <p>{club.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubesDestacados;