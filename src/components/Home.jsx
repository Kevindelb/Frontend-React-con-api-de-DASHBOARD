import Carrusel from './Carrusel';
import Productos from './Productos';

function Home({ onAddToCart }) {
  return (
    <>
      <Carrusel />
      <Productos onAddToCart={onAddToCart} />
    </>
  );
}

export default Home;
