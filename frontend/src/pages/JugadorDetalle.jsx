import React from 'react';

const JugadorDetalle = ({ jugador }) => {
  if (!jugador) return <p className="text-center">Cargando jugador...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-center mb-4">{jugador.nombre}</h2>
      <img
        src={jugador.imagen_url}
        alt={jugador.nombre}
        className="mx-auto w-32 h-32 object-cover rounded-full mb-4"
      />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><strong>Posición:</strong> {jugador.posicion}</div>
        <div><strong>Edad:</strong> {jugador.edad || 'N/A'}</div>
        <div><strong>Altura:</strong> {jugador.altura ? `${jugador.altura} cm` : 'N/A'}</div>
        <div><strong>Pierna hábil:</strong> {jugador.pie || 'N/A'}</div>
        <div><strong>Contrato hasta:</strong> {jugador.contrato?.split('T')[0] || 'N/A'}</div>
        <div><strong>Valor de mercado:</strong> €{jugador.valor_mercado?.toLocaleString() || 'N/A'}</div>
        <div><strong>Nacionalidades:</strong> {jugador.nacionalidades?.join(', ') || 'N/A'}</div>
      </div>
    </div>
  );
};

export default JugadorDetalle;
