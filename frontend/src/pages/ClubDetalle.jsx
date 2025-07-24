import React, { useState, useEffect } from "react";
import ClubInfo from "../components/club-detalle/ClubInfo";
import FormacionVisual from "../components/club-detalle/FormacionVisual";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ClubDetalle.css';

const ClubDetalle = () => {
  const { id: clubId } = useParams();
  const [club, setClub] = useState(null);
  const [formaciones, setFormaciones] = useState([]);
  const [esquema, setEsquema] = useState("4-3-3");
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    axios.get(`/api/clubes/${clubId}`).then(res => setClub(res.data));
    axios.get(`/api/clubes/${clubId}/formaciones`).then(res => {
      setFormaciones(res.data);
      if (res.data.length > 0) {
        const ultima = res.data[res.data.length - 1];
        setEsquema(ultima.esquema);
        axios.get(`/api/formaciones/${ultima.id}/jugadores`)
          .then(res => {
            const titulares = res.data.filter(j => j.FormacionJugador.es_titular);
            setJugadores(titulares);
          });
      }
    });
  }, [clubId]);

  const navigate = useNavigate();
  const manejarCrearFormacion = () => {
    navigate(`/club/${clubId}/crear-formacion`);
  };

  return (
    <div className="club-detalle-container">
      <button className="boton-home" onClick={() => navigate('/')}>
        ← Volver
      </button>
      <div className="club-info-box">
        <ClubInfo club={club} />
      </div>
      <div className="formacion-container">
          <div className="formacion-header">
          <button className="boton-crear" onClick={manejarCrearFormacion}>
            + Crear Nueva Formación
          </button>
          <h2>{esquema}</h2>
        </div>
        <div className="formacion-box">
          <FormacionVisual esquema={esquema} jugadores={jugadores} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetalle;