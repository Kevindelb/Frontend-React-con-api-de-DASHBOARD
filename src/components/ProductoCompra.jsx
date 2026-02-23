import Productos from '../model/Productos.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductoCompra() {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();

  const productosModel = new Productos();
  const getProductoCompra = async ()=>{
    const productoCompra = await productosModel.getProductosPorId(id);
    const productoSeleccionado = Array.isArray(productoCompra) ? productoCompra[0] : productoCompra;
    setProducto(productoSeleccionado || null);
  }

  useEffect(() => {
    getProductoCompra()
  }, [id]);
  

  return (
    <div className="producto-compra-page">
      {!producto ? (
        <p className="producto-compra-empty">No se encontró el producto.</p>
      ) : (
        <section className="producto-compra-layout">
          <div className="producto-compra-grid">
            <aside className="producto-compra-galeria">
              <div className="producto-compra-imagen-wrap">
                <img src={producto.img} alt={producto.nombre} className="producto-compra-imagen" />
              </div>
              <div className="producto-compra-thumbs">
                <img src={producto.img} alt={producto.nombre} className="producto-compra-thumb active" />
              </div>
            </aside>

            <main className="producto-compra-info">
              <h1 className="producto-compra-titulo">{producto.nombre}</h1>
              <p className="producto-compra-id">SKU: {producto.id}</p>
              <p className="producto-compra-descripcion">{producto.descripcion}</p>
            </main>

            <aside className="producto-compra-panel">
              <p className="producto-compra-precio">{producto.precio} €</p>
              <button className="producto-compra-btn">Anadir al carrito</button>
              <ul className="producto-compra-beneficios">
                <li>Envio gratis en pedidos seleccionados</li>
                <li>Devolucion facil en 30 dias</li>
                <li>Soporte de compra 24/7</li>
              </ul>
            </aside>
          </div>
        </section>
      )}
    </div>
  );

}

export default ProductoCompra;
