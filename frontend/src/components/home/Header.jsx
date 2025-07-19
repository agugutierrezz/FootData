import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="/logo-min.png" alt="FootData Logo" className="logo-img" />
        </Link>
      </div>
      <div className="header__search">
        <input
          type="text"
          placeholder="Buscar clubes, jugadores o competiciones..."
          className="search-input"
        />
      </div>
    </header>
  );
}

export default Header;


