import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CarruselJugadores.css';

function CarruselJugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/jugadores/mas-caros')
      .then(res => res.json())
      .then(data => {
        setJugadores(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar jugadores más caros:', err);
        setLoading(false);
      });
  }, []);

  // Mapeo manual de imagen de fondo
  const backgrounds = {
    "Lamine Yamal": "Lamine Yamal.jpeg",
    "Kylian Mbappé": "Kylian Mbappé.jpg",
    "Vinicius Junior": "Vinicius Junior.jpg",
    "Erling Haaland": "Erling Haaland.jpg",
    "Bukayo Saka": "Bukayo Saka.jpg",
    "Florian Wirtz": "Florian Wirtz.jpg",
    "Jude Bellingham": "Jude Bellingham.jpg",
    "Federico Valverde": "Federico Valverde.jpg",
    "Jamal Musiala": "Jamal Musiala.jpg",
    "Pedri": "Pedri.jpg"
  };

  function calcularEdad(fechaNac) {
    const hoy = new Date();
    const fecha = new Date(fechaNac);
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return edad;
  }

  if (loading) {
      return <p className="text-center text-gray-600">Cargando jugadores más caros...</p>;
    }
  
  return (
    <>
      <div className="titulo-carrusel">
        <h2 id="mejor-valuados" className="text-2xl font-bold mb-4 text-white">JUGADORES MEJOR VALUADOS</h2>
      </div>
      <div className="carrusel-swiper">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000 }}
        >
          {jugadores.map((jugador) => {
            const fondo = backgrounds[jugador.nombre] || 'default.jpg';
            const imageUrl = `/backgrounds/${encodeURIComponent(fondo)}`;

            return (
              <SwiperSlide key={jugador.id}>
                <div
                  className="jugador-slide"
                  onClick={() => navigate(`/jugadores/${jugador.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={imageUrl} alt={jugador.nombre} className="jugador-fondo" />
                  <div className="jugador-overlay">
                    <h3>{jugador.nombre}</h3>
                    {jugador.fecha_nacimiento && (
                      <p>{new Date(jugador.fecha_nacimiento).toLocaleDateString('es-ES')} ({calcularEdad(jugador.fecha_nacimiento)} años)</p>
                    )}
                    <p>€{jugador.valor_mercado?.toLocaleString()}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default CarruselJugadores;