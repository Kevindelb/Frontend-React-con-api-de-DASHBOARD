import { Link } from 'react-router-dom';

function CarritoPopUP({ visible, productName, onClose }) {
  return (
    <aside
      className={`carrito-popup ${visible ? 'carrito-popup-visible' : ''}`}
      aria-live="polite"
      aria-hidden={!visible}
    >
      <button
        type="button"
        className="carrito-popup-close"
        onClick={onClose}
        aria-label="Cerrar notificacion"
      >
        x
      </button>

      <p className="carrito-popup-title">Producto anadido</p>
      <p className="carrito-popup-text">
        {productName ? `El producto ${productName} se ha anadido a tu cesta.` : ''}
      </p>

      <Link className="carrito-popup-link" to="/carrito" onClick={onClose}>
        Ver toda la cesta
      </Link>
    </aside>
  );
}

export default CarritoPopUP;
