import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Productos from '../model/Productos.js';
import Producto from './Producto';
import { Link } from 'react-router-dom';

function ProductosdeCategoria() {
  const { id } = useParams();
  const [ProductosCat , setProductosCat] = useState([]);

    const productos = new Productos();

  const getProductos = async ()=>{
     const  newProductos = await productos.getProductosPorCategoria(id);
     setProductosCat(newProductos)

  }

  useEffect(()=>{
    console.log("useffect")    
    getProductos()
  },[]);

  return (
    <section className="content-section">
      <h2 className="section-title">{ProductosCat[0] ? ProductosCat[0].categoria_nombre : "Categoria desconocida"}</h2>
      <div className="productos-container">
        {
        
        ProductosCat[0]?ProductosCat.map((p, index)=> 
        
        <Link  key={index} to={`/productoCompra/${p.id}`}>
        <Producto id={p.id} img={p.img} nombre={p.nombre} descripcion={p.descripcion} precio={p.precio} /> 
        </Link>
        )
        :"No hay productos..." 
        
        } 
      </div>
    </section>
  );
}

export default ProductosdeCategoria;
