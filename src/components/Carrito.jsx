import { useMemo } from 'react';
import { Link } from 'react-router-dom';

function Carrito({ cartItems = [], onIncrease, onDecrease, onRemove, onClear }) {
  const total = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const precio = Number(item.precio) || 0;
        return acc + precio * item.cantidad;
      }, 0),
    [cartItems]
  );

  const handleComprar = () => {
    if (cartItems.length === 0) return;

    const resumen = cartItems
      .map((item) => `- ${item.nombre} x${item.cantidad}`)
      .join('\n');

    window.alert(
      `Se ha realizado un pedido de los siguientes productos:\n\n${resumen}\n\nTotal: ${total.toFixed(
        2
      )} EUR`
    );

    onClear?.();
  };

  return (
    <section className="content-section carrito-page">
      <h2 className="section-title">Carrito de compra</h2>

      {cartItems.length === 0 ? (
        <div className="carrito-vacio">
          <p>No hay productos en el carrito.</p>
          <Link className="carrito-volver" to="/">
            Ir a productos
          </Link>
        </div>
      ) : (
        <>
          <div className="carrito-lista">
            {cartItems.map((item) => (
              <article className="carrito-item" key={item.id}>
                <img className="carrito-item-img" src={item.img} alt={item.nombre} />

                <div className="carrito-item-info">
                  <h3>{item.nombre}</h3>
                  <p>{Number(item.precio).toFixed(2)} EUR por unidad</p>
                </div>

                <div className="carrito-item-acciones">
                  <button type="button" onClick={() => onDecrease?.(item.id)}>
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button type="button" onClick={() => onIncrease?.(item.id)}>
                    +
                  </button>
                </div>

                <p className="carrito-item-subtotal">
                  {(Number(item.precio) * item.cantidad).toFixed(2)} EUR
                </p>

                <button
                  className="carrito-item-eliminar"
                  type="button"
                  onClick={() => onRemove?.(item.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <footer className="carrito-resumen">
            <p>Total: {total.toFixed(2)} EUR</p>
            <button className="carrito-comprar" type="button" onClick={handleComprar}>
              Comprar
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export default Carrito;
