import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CompeticionDetalle() {
  const { id } = useParams();
  const [competicion, setCompeticion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompeticion() {
      try {
        const res = await axios.get(`http://localhost:3000/api/competiciones/${id}`);
        setCompeticion(res.data);
      } catch (err) {
        console.error('Error al obtener la competición:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCompeticion();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!competicion) return <p>Competición no encontrada</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{competicion.nombre}</h1>

      {competicion.imagen_url && (
        <img
          src={competicion.imagen_url}
          alt={`Logo ${competicion.nombre}`}
          style={{ width: 120, marginBottom: '1rem' }}
        />
      )}

      <ul>
        <li><strong>Tipo:</strong> {competicion.tipo}</li>
        <li><strong>País:</strong> {competicion.pais || '—'}</li>
        <li><strong>Continente:</strong> {competicion.continente}</li>
        <li><strong>Código:</strong> {competicion.codigo}</li>
      </ul>
    </div>
  );
}

export default CompeticionDetalle;
