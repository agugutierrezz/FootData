import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JugadorInfo from '../components/jugador-detalle/JugadorInfo';
import EstadisticasJugador from '../components/jugador-detalle/EstadisticasJugador'
import TrofeosJugador from '../components/jugador-detalle/TrofeosJugador';
import BotonVolver from "../components/BotonVolver";
import './JugadorDetalle.css';


function JugadorDetalle() {
  const { id } = useParams();
  const [jugador, setJugador] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [logros, setLogros] = useState([]);

  useEffect(() => {
    fetch(`/api/jugadores/${id}/perfil`)
      .then(res => res.json())
      .then(data => {
        setJugador(data.jugador);
        setEstadisticas(data.estadisticas || []);
        setLogros(data.logros || []);
      });
  }, [id]);

  if (!jugador) return <p>Cargando...</p>;

  return (
    <div className="jugador-detalle-container">
      <BotonVolver />

      <div className="jugador-top-section">
        <JugadorInfo jugador={jugador} />
        <EstadisticasJugador datos={estadisticas} />
      </div>

      <TrofeosJugador trofeos={logros} />
    </div>
  );
}

export default JugadorDetalle;
