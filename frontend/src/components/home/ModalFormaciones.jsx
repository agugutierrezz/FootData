import React, { useEffect, useState } from 'react';
import './ModalFormaciones.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';

function ModalFormaciones({ onClose }) {
  const [formaciones, setFormaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/formaciones', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setFormaciones(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error(err);
        toast.error("Error al cargar formaciones");
      });
  }, []);

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la formación.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/formaciones/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Error al eliminar formación');
      }
      setFormaciones(prev => prev.filter(f => f.id !== id));
      toast.success('Formación eliminada');
    } catch (e) {
      toast.error(e.message || 'Error al eliminar formación');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>MIS FORMACIONES</h2>

        <button className="close-btn" onClick={onClose}>
          <FiX size={20} />
        </button>

        {formaciones.length === 0 ? (
          <p>No tenés formaciones aún.</p>
        ) : (
        <ul className="formaciones-lista">
          {formaciones.map(formacion => (
            <li key={formacion.id} className="formacion-item">
              <div className="formacion-info">
                <img
                  src={`/${formacion.Club?.imagen_url || 'images/default.png'}`}
                  alt={formacion.Club?.nombre}
                />
                <div>
                  <strong>{formacion.esquema}</strong>
                  <p>{formacion.Club?.nombre || 'Club desconocido'}</p>
                  <small>
                    Última actualización: {new Date(formacion.updatedAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <div className="acciones">
                <button onClick={() => navigate(`/formacion/${formacion.id}/editar`)} title="Editar">
                  <FiEdit />
                </button>
                <button onClick={() => handleDelete(formacion.id)} title="Eliminar">
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
        )}
        <div className='mf-botones'>
          <button className="crear-btn" onClick={() => navigate('/formacion/nueva')}>
            <FiPlus style={{ marginRight: 6 }} />
            Crear nueva formación
          </button>
          <button className="boton-seleccion" onClick={() => navigate('/club/seleccion-argentina/crear-formacion')} >
            <img src="/icons/ar.png" alt="🇦🇷" className="icono-escudo"/>
            Armar mi Selección
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFormaciones;
