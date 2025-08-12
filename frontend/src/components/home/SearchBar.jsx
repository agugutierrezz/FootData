import './SearchBar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState({ clubes: [], jugadores: [], competiciones: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 3) {
        fetch(`/api/search?q=${query}`)
          .then(res => res.json())
          .then(data => setResultados(data))
          .catch(() => setResultados({ clubes: [], jugadores: [], competiciones: [] }));
      } else {
        setResultados({ clubes: [], jugadores: [], competiciones: [] });
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleClick = (tipo, id) => {
    if (tipo === 'jugador') navigate(`/jugador/${id}/perfil`);
    if (tipo === 'club') navigate(`/club/${id}`);
    if (tipo === 'competicion') navigate(`/competicion/${id}`);
  };

  const renderItem = (item, tipo) => (
    <div className="search-result" key={`${tipo}-${item.id}`} onClick={() => handleClick(tipo, item.id)}>
      <img
        src={`/${item.imagen_url}`}
        alt={item.nombre}
        className="search-result-image"
        onError={(e) => { e.target.src = '/images/default.png'; }}
      />
      <span>{item.nombre}</span>
    </div>
  );

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar clubes, jugadores o competiciones..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {(resultados.clubes.length > 0 || resultados.jugadores.length > 0 || resultados.competiciones.length > 0) && (
        <div className="search-results">
          {resultados.jugadores.length > 0 && (
            <>
              <div className="search-category">Jugadores</div>
              {resultados.jugadores.map(j => renderItem(j, 'jugador'))}
            </>
          )}
          {resultados.clubes.length > 0 && (
            <>
              <div className="search-category">Clubes</div>
              {resultados.clubes.map(c => renderItem(c, 'club'))}
            </>
          )}
          {resultados.competiciones.length > 0 && (
            <>
              <div className="search-category">Competiciones</div>
              {resultados.competiciones.map(co => renderItem(co, 'competicion'))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
