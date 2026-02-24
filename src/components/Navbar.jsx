
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoriasModel from '../model/Categorias.js';

function Navbar({ cartCount = 0 }) {
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('todo');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const categoriasModel = new CategoriasModel();

  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await categoriasModel.getCategorias();
      setCategorias(data || []);
    };
    cargarCategorias();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = search.trim();

    if (value) {
      navigate(`/?search=${encodeURIComponent(value)}`);
      return;
    }

    if (categoria !== 'todo') {
      navigate(`/categoria/${categoria}`);
      return;
    }

    navigate('/');
  };

  return (
    <div className="navbar-main container-xxl">
      <Link className="brand-block" to="/">
        <span className="brand-mark">TP</span>
        <h2 className="brand-title">TIENDA PRO</h2>
      </Link>

      <form className="search-form" onSubmit={handleSubmit}>
        <select
          className="search-select form-select form-select-sm"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="todo">Todo el catalogo</option>
          {categorias.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="search-input form-control"
          placeholder="Buscar producto "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button btn" aria-label="Buscar">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M11 4a7 7 0 1 0 4.4 12.45l3.57 3.58a1 1 0 0 0 1.42-1.42l-3.58-3.57A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>

      <div className="navbar-actions">
        <button className="nav-action-button" type="button">Mi cuenta</button>
        <button
          className="nav-action-button nav-cart-button"
          type="button"
          onClick={() => navigate('/carrito')}
          aria-label={`Carrito con ${cartCount} productos`}
        >
          Carrito
          <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
