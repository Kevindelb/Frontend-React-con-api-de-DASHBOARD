import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Productos from '../model/Productos.js';
import Producto from './Producto';

function ProductosdeCategoria() {
// Utiliza useParams para obtener los parámetros de la URL
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
    <div>
      <h2>{ProductosCat[0]?ProductosCat[0].categoria_nombre:"Categoría desconocida"}</h2>
      <div className="productos-container">
        {ProductosCat[0]?ProductosCat.map((p, index)=> <Producto key={index} id={p.id} img={p.img} nombre={p.nombre} descripcion={p.descripcion} precio={p.precio} /> ):"No hay productos..." } 
      </div>
    </div>
  
  );

}


export default ProductosdeCategoria;
