import { Link } from 'react-router-dom';
function Menu() {
  return (
  
    <nav className='Menu'>
    <ul>
      <li>
        <Link to="/">Home</Link> {/** IMPORTANTE USAR LINK Y NO A HREF, PERDERÍAMOS ESTADOS ETC.. */}
      </li>
      <li>
        <Link to="/categorias">Categorias</Link>
      </li>
      
    </ul>
  </nav>
  );
}

export default Menu;
