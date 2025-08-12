import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { toast, ToastContainer } from 'react-toastify';
import { FiSave, FiEdit } from 'react-icons/fi';
import './CrearFormacion.css';
import 'react-toastify/dist/ReactToastify.css';

import FormacionEditor from '../components/crear-formacion/FormacionEditor';
import EsquemaSelector from '../components/crear-formacion/EsquemaSelector';
import AgregarRefuerzo from '../components/crear-formacion/AgregarRefuerzo';
import JugadorDisponible from '../components/crear-formacion/JugadorDisponible';
import BotonVolver from "../components/BotonVolver";


const CrearFormacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formacionId, setFormacionId] = useState(null);
  const [clubId, setClubId] = useState(id);
  const [esquema, setEsquema] = useState('4-3-3');
  const [jugadoresPlantel, setJugadoresPlantel] = useState([]);
  const [refuerzos, setRefuerzos] = useState([]);
  const [alineacion, setAlineacion] = useState([]);

  const esSeleccion = clubId === "seleccion-argentina";
  const convocadosArgentina = 
  [ /*ARQ*/ 111873, 229604,
    /*DEF*/ 424042, 402733, 355915, 54781, 480762, 575998, 474800, 60410, 849410,
    /*MED*/ 255901, 166237, 742201, 576028, 401578, 648195, 534033,
    /*DEL*/ 28003, 206050, 668951, 486031, 811779, 576024, 406625];

  const isEdicion = window.location.pathname.includes("/formacion/") && window.location.pathname.includes("/editar");

  const disponibles = [...jugadoresPlantel, ...refuerzos].filter(
    j => !alineacion.some(a => a && a.id === j.id)
  );

  useEffect(() => {
    if (!clubId) return;

    if (clubId === "seleccion-argentina") {
      fetch("/api/jugadores")
        .then(res => res.json())
        .then(data => {
          const argentinos = data.filter(j =>
            j.nacionalidades?.includes("Argentina")
          );
          const convocados = convocadosArgentina
            .map(id => argentinos.find(j => Number(j.id) === id))
            .filter(j => j);
          setJugadoresPlantel(convocados);
        })
        .catch(err => {
          console.error("Error al cargar jugadores argentinos:", err);
          setJugadoresPlantel([]);
        });
    } else {
      fetch(`/api/jugadores/por-club/${clubId}`)
        .then(res => res.json())
        .then(data => setJugadoresPlantel(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error("Error al cargar jugadores:", err);
          setJugadoresPlantel([]);
        });
    }
  }, [clubId]);


  // Si es edición, obtener formación completa (esquema, club y jugadores)
  useEffect(() => {
    if (!isEdicion) return;

    fetch(`/api/formaciones/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setEsquema(data.esquema);
          setClubId(data.club_id);
          setFormacionId(data.id);
          if (Array.isArray(data.jugadores)) {
            setAlineacion(data.jugadores.map(j => ({ ...j, id: j.id })));
          }
        }
      })
      .catch(err => console.error("Error al cargar datos de la formación:", err));
  }, [id]);


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

    toPng(node, { cacheBust: true, filter: (node) => !node.classList || !node.classList.contains('no-capture')})
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

  const handleGuardarFormacion = async () => {
    const titulares = alineacion.filter(j => j !== null);

    if (titulares.length < 11) {
      toast.error("Debes seleccionar 11 jugadores titulares antes de guardar.");
      return;
    }

    const body = {
      club_id: Number(clubId),
      esquema,
      jugadores: titulares.map(j => ({
        jugador_id: j.id,
        es_titular: true
      }))
    };

    try {
      const response = await fetch(
        isEdicion
          ? `/api/formaciones/${formacionId}`
          : "/api/formaciones",
        {
          method: isEdicion ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) throw new Error("Error al guardar la formación");

      toast.success(isEdicion ? "Formación actualizada" : "Formación guardada correctamente");

      setTimeout(() => navigate(`/club/${clubId}`), 1500);
    } catch (error) {
      console.error("Error al guardar formación:", error);
      toast.error("Ocurrió un error al guardar la formación.");
    }
  };

  return (
    <div className="crear-formacion">
      <ToastContainer position="top-center" autoClose={3000} />
      <BotonVolver/>
      <div className="guardar-wrapper">
        <button className="guardar-btn" onClick={handleGuardarFormacion}>
          {isEdicion ? (
            <>
              <FiEdit style={{ marginRight: 8 }} />
              Actualizar Formación
            </>
          ) : (
            <>
              <FiSave style={{ marginRight: 8 }} />
              Guardar Formación
            </>
          )}
        </button>
      </div>


      <div className="formacion-body">
        <FormacionEditor
          esquema={esquema}
          alineacion={alineacion}
          setAlineacion={setAlineacion}
          disponibles={disponibles}
          handleGuardarImagen={handleGuardarImagen}
        />

        <div className="panel-derecho">
          <EsquemaSelector esquema={esquema} setEsquema={setEsquema} />
          <AgregarRefuerzo onAgregar={handleAgregarRefuerzo} nacionalidad={esSeleccion ? 'Argentina' : null} />
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