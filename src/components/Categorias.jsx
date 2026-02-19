import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Categorias() {
  // Utiliza useParams para obtener los parámetros de la URL
const urlAPI = 'http://localhost/Dashboard/apibotiga/apiCategorias.php';
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async ()=>{

    try{

    const response = await fetch(urlAPI)

      if(!response.ok)  {
        const errorObject = await response.json();
        console.log(errorObject.error);
        return;
      }

      const categorias = await response.json();
      console.log(categorias);
      setCategorias(categorias)

    }catch(error){
      console.log('Error al obtener productos' , error);
      return null;
    }
  };
  useEffect(()=>{
    console.log("useffect")    
    getCategorias()
  },[]);

   return (
    <div>
      <h2>Descubre los mejores Productos al mejor precio</h2>
      {categorias.map((c, index)=><Link key={index} to={`/categoria/${c.id}`}> {c.nombre} </Link> ) } 
      
    </div>
  
  );

}


export default Categorias;
