import './Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useState } from 'react';
import ModalFormaciones from './ModalFormaciones';

function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to="/">
            <img src="/logo-min.png" alt="FootData Logo" className="logo-img" />
          </Link>
        </div>

        <div className="header__search">
          <SearchBar />
        </div>

        <div className="header__actions">
          <button className="armatu11-btn" onClick={() => setShowModal(true)}>
            ¡Armá tu 11!
          </button>
        </div>
      </header>

      {showModal && <ModalFormaciones onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Header;



