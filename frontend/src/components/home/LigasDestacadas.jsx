import './LigasDestacadas.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function LigasDestacadas() {
  const navigate = useNavigate();
  const [ligas, setLigas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/competiciones/ligas-destacadas')
      .then(res => res.json())
      .then(data => {
        setLigas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar ligas destacadas:', err);
        setLoading(false);
      });
  }, []);

  const handleClick = (liga) => {
    navigate(`/competicion/${liga.id}`);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Cargando ligas destacadas...</p>;
  }

  return (
    <div className="categorias-container">
      <h2>LIGAS DESTACADAS</h2>
      <div className="categorias-grid">
        {ligas.map((liga) => (
          <div key={liga.id} className="categoria-card" onClick={() => handleClick(liga)}>
            <img src={liga.imagen_url} alt={liga.nombre} />
            <p>{liga.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LigasDestacadas;