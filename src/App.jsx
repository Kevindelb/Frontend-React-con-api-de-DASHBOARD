import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Productos from './components/Productos';
import Categorias from './components/Categorias';
import ProductosdeCategoria from './components/ProductodeCategoria';
import ProductoCompra from './components/ProductoCompra';
import './App.css';

function App() {
  
  
  return (
    
    <Router>
      <div>
        <Navbar></Navbar>
        <Menu></Menu>
        
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categoria/:id" element={<ProductosdeCategoria />} />
          <Route path="/productoCompra/:id" element={<ProductoCompra />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
