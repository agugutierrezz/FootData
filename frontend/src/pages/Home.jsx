import Header from '../components/home/Header';
import CarruselJugadores from '../components/home/CarruselJugadores';
import LigasDestacadas from '../components/home/LigasDestacadas';
import ClubesDestacados from '../components/home/ClubesDestacados';

function Home() {
  return (
    <div>
      <Header />
      <CarruselJugadores />
      <LigasDestacadas />
      <ClubesDestacados />
    </div>
  );
}

export default Home;
