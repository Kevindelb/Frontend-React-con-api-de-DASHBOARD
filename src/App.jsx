import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Home from './components/Home';
import Categorias from './components/Categorias';
import ProductosdeCategoria from './components/ProductodeCategoria';
import ProductoCompra from './components/ProductoCompra';
import Carrito from './components/Carrito';
import CarritoPopUP from './components/CarritoPopUP';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartPopupProduct, setCartPopupProduct] = useState('');
  const noticeTimeoutRef = useRef(null);

  const addToCart = (producto) => {
    if (!producto?.id) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === producto.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });

    setCartPopupProduct(producto.nombre);
    if (noticeTimeoutRef.current) {
      window.clearTimeout(noticeTimeoutRef.current);
    }
    noticeTimeoutRef.current = window.setTimeout(() => {
      setCartPopupProduct('');
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (noticeTimeoutRef.current) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  const increaseItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
    );
  };

  const decreaseItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.cantidad, 0),
    [cartItems]
  );

  return (
    <Router>
      <div className="app-shell d-flex flex-column min-vh-100">
        <header className="app-header">
          <Navbar cartCount={cartCount} />
          <Menu />
        </header>

        <CarritoPopUP
          visible={Boolean(cartPopupProduct)}
          productName={cartPopupProduct}
          onClose={() => setCartPopupProduct('')}
        />

        <main className="app-content container-xxl flex-grow-1">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/navbar" element={<Navbar cartCount={cartCount} />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route
              path="/categoria/:id"
              element={<ProductosdeCategoria onAddToCart={addToCart} />}
            />
            <Route
              path="/productoCompra/:id"
              element={<ProductoCompra onAddToCart={addToCart} />}
            />
            <Route
              path="/carrito"
              element={
                <Carrito
                  cartItems={cartItems}
                  onIncrease={increaseItem}
                  onDecrease={decreaseItem}
                  onRemove={removeItem}
                  onClear={clearCart}
                />
              }
            />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
