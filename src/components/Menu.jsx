import { Link } from 'react-router-dom';
function Menu() {
  return (
    <nav className="menu-bar">
      <ul className="menu-list">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/categorias">Categorias</Link>
        </li>
        <li>
          <Link to="/">Campanas y ofertas</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
