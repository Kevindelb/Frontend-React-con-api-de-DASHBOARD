function Producto(props) {

  
  return (
    <>
        <div className="producto-card">
            <div className="producto-imagen-container">
                <p>{props.id}</p>
                <img src={props.img} alt={props.nombre} className="producto-imagen"></img>
            </div>
            <div className="producto-info">
                <h3 className="producto-nombre">Nombre: {props.nombre}</h3>
                <p className="producto-descripcion">Descripción: {props.descripcion}</p>
                <span className="producto-precio">Precio:{props.precio} €</span>
            </div>

            <button className="btn-añadir">
                Añadir al carrito
            </button>
        </div>
    </>
  )
}

export default Producto
