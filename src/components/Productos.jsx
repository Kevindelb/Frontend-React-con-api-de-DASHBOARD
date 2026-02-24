import { useEffect, useState } from 'react';
import Producto  from './Producto';
import ProductosModel from '../model/Productos.js';
import { useLocation } from 'react-router-dom';

function Productos({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const productosModel = new ProductosModel();

  const queryParam = new URLSearchParams(location.search).get('search') || '';
  
  const searchTerm = queryParam.trim().toLowerCase();

  const getProductos = async ()=>{
    const newProductos = await productosModel.getProductos();
    setProductos(newProductos || []);
  };

  useEffect(()=>{
    console.log("useffect")    
    getProductos()
  },[]);

  const productosFiltrados = searchTerm
    ? productos.filter((p) => p.nombre?.toLowerCase().includes(searchTerm))
    : productos;
  

  return (
    <section className="content-section">
      <h2 className="section-title">Descubre los mejores productos al mejor precio</h2>
      {searchTerm && (
        <p className="search-results-info">
          Resultados para: "{queryParam}" ({productosFiltrados.length})
        </p>
      )}
      <div className="productos-container">
        {productosFiltrados.map((p, index)=> (
          <Producto
            key={index}
            id={p.id}
            img={p.img}
            nombre={p.nombre}
            descripcion={p.descripcion}
            precio={p.precio}
            onAdd={onAddToCart}
          />
        ))}
      </div>
      {searchTerm && productosFiltrados.length === 0 && (
        <p>No se encontraron productos con ese nombre.</p>
      )}
    </section>
  );

}

export default Productos;
