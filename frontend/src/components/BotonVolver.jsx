import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './BotonVolver.css';

const BotonVolver = () => {
  const navigate = useNavigate();

  return (
    <button className="boton-volver-icono" onClick={() => navigate(-1)} title="Volver">
      <FiArrowLeft size={24} />
    </button>
  );
};

export default BotonVolver;

