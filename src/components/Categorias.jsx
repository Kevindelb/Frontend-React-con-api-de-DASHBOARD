import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categorias() {
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
    <section className="content-section">
      <h2 className="section-title">Categorias</h2>
      <div className="category-grid">
        {categorias.map((c, index) => (
          <Link className="category-chip" key={index} to={`/categoria/${c.id}`}>
            {c.nombre}
          </Link>
        ))}
      </div>
    </section>
  );
}


export default Categorias;
