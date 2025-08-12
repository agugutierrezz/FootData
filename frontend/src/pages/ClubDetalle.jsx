import React, { useState, useEffect } from "react";
import ClubInfo from "../components/club-detalle/ClubInfo";
import ListadoJugadores from "../components/club-detalle/ListadoJugadores";
import { useParams, useNavigate } from "react-router-dom";
import './ClubDetalle.css';
import BotonVolver from "../components/BotonVolver";
import { FiPlus } from 'react-icons/fi';
import api from '../services/api';

const ClubDetalle = () => {
  const { id: clubId } = useParams();
  const [club, setClub] = useState(null);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    api.get(`/clubes/${clubId}`).then(res => setClub(res.data));
    api.get(`/jugadores/por-club/${clubId}`)
      .then(res => setJugadores(res.data))
      .catch(err => console.error("Error al obtener jugadores del club", err));
  }, [clubId]);

  const navigate = useNavigate();
  const manejarCrearFormacion = () => {
    navigate(`/club/${clubId}/crear-formacion`);
  };

  return (
    <div className="club-detalle-container">
      <BotonVolver/>
      <div className="club-info-box">
        <ClubInfo club={club} />
      </div>

      <div className="formacion-container">
        <div className="formacion-header">
          <button className="boton-crear" onClick={manejarCrearFormacion}>
            <FiPlus style={{ marginRight: 6 }} />
            Crear Nueva Formación
          </button>
        </div>

        <div className="jugadores-box">
          <ListadoJugadores jugadores={jugadores} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetalle;
