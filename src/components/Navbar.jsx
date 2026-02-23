
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = search.trim();
    navigate(value ? `/?search=${encodeURIComponent(value)}` : '/');
  };

  return (
    <div className="navbar-main">
      <div className="brand-block">
        <span className="brand-mark">TP</span>
        <h2 className="brand-title">TIENDA PRO</h2>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <select className="search-select" defaultValue="todo">
          <option value="todo">Todo el catalogo</option>
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar producto por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <div className="navbar-actions">
        <button className="nav-action-button" type="button">Mi cuenta</button>
        <button className="nav-action-button" type="button">Mi cesta</button>
      </div>
    </div>
  );
}

export default Navbar;
