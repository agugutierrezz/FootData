import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CrearFormacion.css';
import { toPng } from 'html-to-image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormacionEditor from '../components/crear-formacion/FormacionEditor';
import EsquemaSelector from '../components/crear-formacion/EsquemaSelector';
import AgregarRefuerzo from '../components/crear-formacion/AgregarRefuerzo';
import JugadorDisponible from '../components/crear-formacion/JugadorDisponible';

const CrearFormacion = () => {
  const { id: clubId } = useParams();
  const [esquema, setEsquema] = useState('4-3-3');
  const [jugadoresPlantel, setJugadoresPlantel] = useState([]);
  const [refuerzos, setRefuerzos] = useState([]);
  const [alineacion, setAlineacion] = useState([]);
  const navigate = useNavigate();

  const disponibles = [...jugadoresPlantel, ...refuerzos].filter(
    j => !alineacion.some(a => a && a.id === j.id)
  );

  useEffect(() => {
    if (!clubId) return;
    fetch(`http://localhost:3000/api/jugadores/por-club/${clubId}`)
      .then(res => res.json())
      .then(data => setJugadoresPlantel(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Error al cargar jugadores:", err);
        setJugadoresPlantel([]);
      });
  }, [clubId]);

  const handleAgregarRefuerzo = (jugador) => {
    if (!refuerzos.find(j => j.id === jugador.id)) {
      setRefuerzos(prev => [...prev, jugador]);
    }
  };

  const handleGuardarImagen = () => {
    const titulares = alineacion.filter(j => j !== null);
    if (titulares.length < 11) {
      toast.error("Debes seleccionar 11 jugadores titulares antes de guardar.");
      return;
    }

    const node = document.querySelector('.formacion-editor');
    if (!node) {
      toast.error("No se pudo encontrar el área de la formación.");
      return;
    }

    toPng(node, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `formacion_${esquema}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error al generar imagen', err);
        toast.error("Ocurrió un error al guardar la imagen.");
      });
  };

  return (
    <div className="crear-formacion">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="volver-wrapper">
        <button className="volver-btn" onClick={() => navigate(`/club/${clubId}`)}>
          ← Volver al Club
        </button>
      </div>

      <div className="guardar-wrapper">
        <button className="guardar-btn" onClick={handleGuardarImagen}>
          💾 Guardar Imagen
        </button>
      </div>

      <div className="formacion-body">
        <FormacionEditor
          esquema={esquema}
          alineacion={alineacion}
          setAlineacion={setAlineacion}
          disponibles={disponibles}
        />

        <div className="panel-derecho">
          <EsquemaSelector esquema={esquema} setEsquema={setEsquema} />
          <AgregarRefuerzo onAgregar={handleAgregarRefuerzo} />
          <h3>Jugadores Disponibles</h3>
          <div className="jugadores-disponibles">
            {disponibles.map((jugador) => (
              <JugadorDisponible key={jugador.id} jugador={jugador} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearFormacion;
