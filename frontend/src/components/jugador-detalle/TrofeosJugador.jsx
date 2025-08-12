import './TrofeosJugador.css';

function TrofeosJugador({ trofeos }) {
  return (
    <div className="trofeos-container">
      <h3>Trofeos ganados</h3>
      <div className="trofeos-grid">
        {trofeos.map((t, index) => (
          <div key={index} className="trofeo-card">
            <img
              src={`/images/trofeos/${t.titulo}.png`}
              className="trofeo-imagen"
              onError={(e) => (e.target.src = '/images/trofeos/default.png')}
            />
            <p><strong>{t.titulo} ({t.anio})</strong></p>
            {t.equipo !== 'Desconocido' && <p>{t.equipo}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrofeosJugador;