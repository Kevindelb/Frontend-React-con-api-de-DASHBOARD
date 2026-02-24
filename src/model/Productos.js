import bufandaImg from '../assets/ImagenesProductos/bufanda.jpg';
import camisetaImg from '../assets/ImagenesProductos/camiseta.jpg';
import cinturonImg from '../assets/ImagenesProductos/cinturon.jpg';
import gorraImg from '../assets/ImagenesProductos/gorra.jpg';
import pantalonImg from '../assets/ImagenesProductos/pantalon.jpg';
import sandaliasImg from '../assets/ImagenesProductos/sandalias.jpg';
import sudaderaImg from '../assets/ImagenesProductos/sudadera.jpg';
import zapatosImg from '../assets/ImagenesProductos/zapatos.jpg';

class Productos{

    constructor() {
        this.urlAPI = 'http://localhost/Dashboard/apibotiga/apiProductos.php';
        this.imagenesPorNombre = {
          bufanda: bufandaImg,
          camiseta: camisetaImg,
          cinturon: cinturonImg,
          gorra: gorraImg,
          pantalon: pantalonImg,
          sandalias: sandaliasImg,
          sudadera: sudaderaImg,
          zapatos: zapatosImg,
        };
    }

    normalizarTexto(texto = '') {
      return texto
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    }

    getImagenPorNombre(nombre = '') {
      const nombreNormalizado = this.normalizarTexto(nombre);
      const clave = Object.keys(this.imagenesPorNombre).find((item) =>
        nombreNormalizado.includes(item)
      );
      return clave ? this.imagenesPorNombre[clave] : null;
    }

    aplicarImagenProducto(producto) {
      if (!producto) return producto;
      const imagenLocal = this.getImagenPorNombre(producto.nombre);
      return {
        ...producto,
        img: imagenLocal || producto.img || '',
      };
    }

    mapearImagenes(data) {
      if (Array.isArray(data)) {
        return data.map((producto) => this.aplicarImagenProducto(producto));
      }
      return this.aplicarImagenProducto(data);
    }

    async getProductos() {
      try {
        const response = await fetch(this.urlAPI);
        if (!response.ok) {
          const errorObject = await response.json();
          console.log(errorObject.error);
          return;
        }
        const productos = await response.json();
        return this.mapearImagenes(productos);
      } catch (error) {
        console.log('Error al obtener productos', error);
        return null;
      }
    }

    async getProductosPorId(id){
      try{
        const response = await fetch(this.urlAPI + '?id=' + id);
        if(!response.ok)  {
          const errorObject = await response.json();
          console.log(errorObject.error);
          return;
        }
        const productos = await response.json();
        return this.mapearImagenes(productos);
      }catch(error){
        console.log('Error al obtener producto por ID:', error);
        return null;
      }
    }

    async getProductosPorCategoria(id) {
    
        try{
    
            const response = await fetch(this.urlAPI + '?grupid=' + id)
    
          if(!response.ok)  {
            const errorObject = await response.json();
            console.log(errorObject.error);
            return;
          }
    
          const productos = await response.json();
          console.log("Estos son los productos que entran:");
          console.log(productos);
          return this.mapearImagenes(productos)
    
        }catch(error){
          console.log('Error al obtener productos' , error);
          return null;
        }
      };
    
}

export default Productos;
