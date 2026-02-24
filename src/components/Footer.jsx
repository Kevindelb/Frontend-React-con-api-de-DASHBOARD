import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-column footer-brand">
          <Link className="footer-brand-link" to="/">
            <h3 className="footer-title">TIENDA PRO</h3>
          </Link>
          <p className="footer-text">
            Encuentra productos confiables, buenos precios y envios a todo el pais.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Informacion</h4>
          <ul className="footer-links">
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Terminos y condiciones</a></li>
            <li><a href="#">Politica de privacidad</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Atencion al cliente</h4>
          <ul className="footer-links">
            <li><a href="#">Mi cuenta</a></li>
            <li><a href="#">Metodos de pago</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
            <li><a href="#">Seguimiento de pedido</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Contacto</h4>
          <ul className="footer-contact">
            <li>Telefono: +54 11 2345-6789</li>
            <li>Email: contacto@tiendapro.com</li>
            <li>Direccion: Av. Comercial 123, Buenos Aires</li>
            <li>Horario: Lun a Vie 9:00 - 18:00</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {currentYear} Tienda Pro. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}

export default Footer;
