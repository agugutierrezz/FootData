import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CompeticionDetalle.css';
import BotonVolver from "../components/BotonVolver";
import api from '../services/api';

function CompeticionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [competicion, setCompeticion] = useState(null);
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resComp, resClubes] = await Promise.all([
          api.get(`/competiciones/${id}`),
          api.get(`/competiciones/${id}/clubes`)
        ]);
        setCompeticion(resComp.data);
        const clubesOrdenados = resClubes.data.sort((a, b) => b.valor_plantel - a.valor_plantel);
        setClubes(clubesOrdenados);
      } catch (err) {
        console.error('Error al obtener datos:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!competicion) return <p>Competición no encontrada</p>;

  return (
    <div className="competicion-detalle-container">
        <BotonVolver/>
        <div className="competicion-info">
          <h1>{competicion.nombre}</h1>
          {competicion.imagen_url && (
            <img
              src={`/${competicion.imagen_url}`}
              alt={`Logo ${competicion.nombre}`}
              style={{ width: 120, marginBottom: '1rem' }} />
          )}
        </div>
        <div className="cd-clubes-listado">
          <h2>Clubes</h2>
          <div className="cd-clubes-columna">
            {clubes.map((club) => (
              <div
                key={club.id}
                className="cd-club-card"
                onClick={() => navigate(`/club/${club.id}`)}
              >
                <img
                  src={`/${club.imagen_url}`}
                  alt={club.nombre}
                  onError={(e) => { e.target.src = '/images/default.png'; } } />
                <p>{club.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default CompeticionDetalle;