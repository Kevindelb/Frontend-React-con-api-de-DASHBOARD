import { useEffect, useState } from 'react';
import panel1Img from '../assets/ImagenesPanel/panel1.webp';
import panel2Img from '../assets/ImagenesPanel/panel2.png';
import panel3Img from '../assets/ImagenesPanel/panel3.png';

const slides = [
  {
    image: panel1Img,
    title: 'Nuevas colecciones cada semana',
    subtitle: 'Descubre prendas y accesorios con envios rapidos a todo el pais.',
  },
  {
    image: panel2Img,
    title: 'Ofertas destacadas en calzado',
    subtitle: 'Aprovecha precios especiales por tiempo limitado.',
  },
  {
    image: panel3Img,
    title: 'Tendencias que marcan estilo',
    subtitle: 'Suma nuevos looks con piezas seleccionadas para esta temporada.',
  },
];

function Carrusel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-carousel" aria-label="Promociones destacadas">
      <div
        className="hero-carousel-track"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <article key={slide.title} className="hero-carousel-slide">
            <img src={slide.image} alt={slide.title} className="hero-carousel-image" />
            <div className="hero-carousel-overlay" />
            <div className="hero-carousel-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="hero-carousel-arrow hero-carousel-arrow-left"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="hero-carousel-arrow hero-carousel-arrow-right"
        onClick={nextSlide}
        aria-label="Slide siguiente"
      >
        ›
      </button>

      <div className="hero-carousel-dots" role="tablist" aria-label="Seleccionar slide">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            role="tab"
            aria-selected={index === activeSlide}
            aria-label={`Ir al slide ${index + 1}`}
            className={`hero-carousel-dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Carrusel;
