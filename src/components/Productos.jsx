import { useEffect, useState } from 'react';
import Producto  from './Producto';
import { useParams } from 'react-router-dom';

function Productos() {
  // Utiliza useParams para obtener los parámetros de la URL

  const urlAPI = 'http://localhost/Dashboard/apibotiga/apiProductos.php';
  const [productos, setProductos] = useState([]);

  const getProductos = async ()=>{

    try{

    const response = await fetch(urlAPI)

      if(!response.ok)  {
        const errorObject = await response.json();
        console.log(errorObject.error);
        return;
      }

      const productos = await response.json();
      console.log(productos);
      setProductos(productos)

    }catch(error){
      console.log('Error al obtener productos' , error);
      return null;
    }
  };
  useEffect(()=>{
    console.log("useffect")    
    getProductos()
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

export default Productos;
