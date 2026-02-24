import { Link } from 'react-router-dom';

function Producto(props) {
  return (
    <>
      <div className="producto-card">
        <Link className="producto-link" to={`/productoCompra/${props.id}`}>
            <div className="producto-imagen-container">
              <img src={props.img} alt={props.nombre} className="producto-imagen"></img>
            </div>
            <div className="producto-info">
              <h3 className="producto-nombre">{props.nombre}</h3>
              <p className="producto-descripcion"> {props.descripcion}</p>
              <span className="producto-precio">{props.precio} €</span>
            </div>
        </Link>

        <button
          className="btn-anadir"
          type="button"
          onClick={() =>
            props.onAdd?.({
              id: props.id,
              img: props.img,
              nombre: props.nombre,
              precio: props.precio,
            })
          }
        >
          Anadir al carrito
        </button>
      </div>
    </>
  );
}

export default Producto;
