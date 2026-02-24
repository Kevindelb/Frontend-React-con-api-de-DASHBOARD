import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import calzadoImg from '../assets/ImagenesCategorias/CalzadoSVG.jpg';
import ropaImg from '../assets/ImagenesCategorias/RopaSVG.jpg';
import accesoriosImg from '../assets/ImagenesCategorias/AccesoriosSVG.jpg';
import CategoriasModel from '../model/Categorias.js';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const categoriasModel = new CategoriasModel();
  const categoriasImagenes = {
    calzado: calzadoImg,
    ropa: ropaImg,
    accesorios: accesoriosImg,
  };

  const normalizarCategoria = (nombre = '') =>
    nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const getCategorias = async ()=>{
    const nuevasCategorias = await categoriasModel.getCategorias();
    setCategorias(nuevasCategorias || []);
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
            {categoriasImagenes[normalizarCategoria(c.nombre)] && (
              <img
                className="category-image"
                src={categoriasImagenes[normalizarCategoria(c.nombre)]}
                alt={c.nombre}
              />
            )}
            <span>{c.nombre}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}


export default Categorias;
