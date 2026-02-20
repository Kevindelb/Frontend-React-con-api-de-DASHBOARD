import Productos from '../model/Productos.js';
import { useState } from 'react';
import { useEffect } from 'react';

function ProductoCompra() {
  const [productos, setProductos] = useState([]);

  const productosModel = new Productos();
 const getProductoCompra = async ()=>{
     const  ProductoCompra = await productosModel.getProductosPorId(id);
     setProductos(ProductoCompra)

  }

  useEffect(()=>{
    console.log("useffect")    
    getProductoCompra()
  },[]);
  

  return (
    <div>
      <h2>Descubre los mejores Productos al mejor precio</h2>
      <div className="productos-container">
        {productos.map((p, index)=> <Producto key={index} id={p.id} img={p.img} nombre={p.nombre} descripcion={p.descripcion} precio={p.precio} /> )}
      </div>
    </div>
  );

}

export default ProductoCompra;