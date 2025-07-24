import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClubDetalle from './pages/ClubDetalle';
import JugadorDetalle from './pages/JugadorDetalle';
import CompeticionDetalle from './pages/CompeticionDetalle';
import CrearFormacion from './pages/CrearFormacion';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/club/:id" element={<ClubDetalle />} />
      <Route path="/jugador/:id" element={<JugadorDetalle />} />
      <Route path="/competicion/:id" element={<CompeticionDetalle />} />
      <Route path="/club/:id/crear-formacion" element={<CrearFormacion />} />
    </Routes>
  );
}

export default App;


