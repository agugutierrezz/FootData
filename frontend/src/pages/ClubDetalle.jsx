import React from 'react';

const ClubDetalle = ({ club }) => {
  if (!club) return <p className="text-center">Cargando club...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{club.nombre}</h2>
      <img
        src={club.imagen_url}
        alt={club.nombre}
        className="mx-auto w-40 h-40 object-contain mb-4"
      />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><strong>País:</strong> {club.pais || 'Desconocido'}</div>
        <div><strong>Liga:</strong> {club.liga || 'N/A'}</div>
        <div><strong>Estadio:</strong> {club.estadio || 'N/A'}</div>
        <div><strong>Año de fundación:</strong> {club.fundacion || 'N/A'}</div>
        <div><strong>Valor plantel:</strong> €{club.valor_plantel?.toLocaleString() || 'N/A'}</div>
        <div><strong>Código:</strong> {club.codigo}</div>
      </div>
    </div>
  );
};

export default ClubDetalle;
