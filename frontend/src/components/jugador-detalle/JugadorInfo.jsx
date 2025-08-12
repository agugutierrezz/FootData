import './JugadorInfo.css';

function JugadorInfo({ jugador }) {
  return (
    <div className="jugador-info">
    <img
      src={`/${jugador.imagen_url}`}
      alt={jugador.nombre}
      className="jugador-imagen"
      onError={(e) => { e.target.src = '/images/default.png' }}
    />
      <div className="jugador-datos">
        <h2>{jugador.nombre}</h2>
        <p>Edad: {jugador.edad}</p>
        <p>Nacionalidades: {jugador.nacionalidades?.join(', ')}</p>
        <p>Posición: {jugador.posicion}</p>
        <p>Valor de mercado: €{jugador.valor_mercado?.toLocaleString() || 'No disponible'}</p>
        <p>Club actual: {jugador.club?.nombre}</p>
        {jugador.id && (
          <p>
            Más información en{" "}
            <a
              href={`https://www.transfermarkt.com/-/profil/spieler/${jugador.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4da6ff", textDecoration: "underline" }}
            >
              Transfermarkt
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default JugadorInfo;
