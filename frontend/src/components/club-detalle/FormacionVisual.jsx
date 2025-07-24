import JugadorCard from "./JugadorCard";
import getPosiciones from "./posicionesFormacion";
import './FormacionVisual.css';

const FormacionVisual = ({ esquema, jugadores }) => {
  const posiciones = getPosiciones(esquema);

  return (
    <div className="field-container">
      <div
        className="relative w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/field.png')" }} // Imagen del campo
      >
        {posiciones.map((pos, i) => {
          const jugador = jugadores[i];
          if (!jugador) return null;
          return (
            <JugadorCard
              key={jugador.id}
              jugador={jugador}
              posicion={pos.label}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormacionVisual;








