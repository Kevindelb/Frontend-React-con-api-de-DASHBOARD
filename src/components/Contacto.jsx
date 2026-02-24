import { useState } from 'react';

const CONTACTO_API_URL =
  import.meta.env.VITE_CONTACTO_API_URL ||
  'http://localhost/Dashboard/apibotiga/apiContacto.php';

const initialForm = {
  usuario: '',
  email: '',
  mensaje: '',
};

function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const usuario = form.usuario.trim();
    const email = form.email.trim();
    const mensaje = form.mensaje.trim();

    if (!usuario || !email || !mensaje) {
      return 'Usuario, email y mensaje son obligatorios.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Introduce un email valido.';
    }

    if (mensaje.length < 10) {
      return 'El mensaje debe tener al menos 10 caracteres.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const error = validate();
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        usuario: form.usuario.trim(),
        email: form.email.trim(),
        mensaje: form.mensaje.trim(),
      };

      const response = await fetch(CONTACTO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let parsed;
      try {
        parsed = responseText ? JSON.parse(responseText) : null;
      } catch {
        parsed = null;
      }

      if (!response.ok) {
        const apiError =
          parsed?.message || parsed?.error || 'No se pudo enviar el mensaje.';
        throw new Error(apiError);
      }

      setStatus({
        type: 'success',
        message: parsed?.message || 'Mensaje enviado correctamente.',
      });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Error de conexion con la API.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contacto-page container-fluid px-0">
      <div className="contacto-card">
        <h1 className="contacto-title">Contacto</h1>
        <p className="contacto-subtitle">
          Envia tu consulta y nos pondremos en contacto contigo.
        </p>

        <form className="contacto-form row g-3" onSubmit={handleSubmit}>
          <div className="col-12 col-md-6">
            <label className="contacto-label form-label" htmlFor="usuario">
              Nombre
            </label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              className="contacto-input form-control"
              value={form.usuario}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="contacto-label form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="contacto-input form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="col-12">
            <label className="contacto-label form-label" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="contacto-textarea form-control"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Escribe tu mensaje"
              rows={6}
              required
            />
          </div>

          <div className="col-12 col-md-auto">
            <button className="contacto-button btn" type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>

          {status.message ? (
            <div className="col-12">
              <p
                className={
                  status.type === 'success'
                    ? 'contacto-status contacto-status-success alert mb-0'
                    : 'contacto-status contacto-status-error alert mb-0'
                }
                role="alert"
              >
                {status.message}
              </p>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default Contacto;
