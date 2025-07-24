import './JugadorCard.css';

const JugadorCard = ({ jugador, posicion, style }) => {
  return (
    <div className="jugador-card" style={style}>
      <img
        src={`http://localhost:3000/${jugador.imagen_url}`}
        alt={jugador.nombre}
        className="w-12 h-12 rounded-full border-2 border-white shadow"
      />
      <p className="text-white text-sm mt-1 drop-shadow">{posicion} {jugador.nombre}</p>
    </div>
  );
};

export default JugadorCard;





