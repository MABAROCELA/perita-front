import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
    const [email, setEmail] = useState('');

    const enviarCorreo = async () => {    
        
        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const response = await fetch(`${URL_BACK}/enviar-correo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                console.log('Correo enviado correctamente');
            } else {
                console.error('Error al enviar el correo');
            }
        } catch (error) {
            console.error('Error al enviar el correo', error);
        }
    };

    const handleSuscribe = (e) => {
        e.preventDefault();
        enviarCorreo();
        alert('Suscripción exitosa'); 
        setEmail("");
    };

    return (
        <>
            <div className='footer-body'>
                <footer className="footer">
                    <section className="ft-main">
                        <div className="ft-main-item">
                            <h2 className="ft-title">PERITA</h2>
                            <ul className='footer-ul'>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Quiénes somos</a></li>
                                <li><Link to="/ListaProductos">Colección</Link></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Devoluciones</a></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Clientes felices</a></li>
                            </ul>
                        </div>
                        <div className="ft-main-item">
                            <h2 className="ft-title">COLECCIONES</h2>
                            <ul className='footer-ul'>
                                <li><Link to="/ListaProductos">Fall-Winter 23</Link></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Spring-Summer 22</a></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Fall-Winter 22</a></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Anteriores</a></li>
                            </ul>
                        </div>
                        <div className="ft-main-item">
                            <h2 className="ft-title">CONTACTO</h2>
                            <ul className='footer-ul'>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Ayuda</a></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Compras</a></li>
                                <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Anuncios</a></li>
                            </ul>
                        </div>
                        <div className="ft-main-item">
                            <h2 className="ft-title">¡ÚLTIMO MOMENTO!</h2>
                            <p>Suscribite para recibir las últimas novedades.</p>
                            <form onSubmit={handleSuscribe}>
                                <input
                                    className="suscribe"
                                    type="email"
                                    name="email"
                                    placeholder="Ingresá tu mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit" className="susButton">
                                    Suscribirme
                                </button>
                            </form>
                        </div>
                    </section>
                    <section className="ft-legal">
                        <ul className="ft-legal-list">
                            <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Términos &amp; Condiciones</a></li>
                            <li><a href="http://www.cap.org.ar" target="_blank" rel="noreferrer">Política de Privacidad</a></li>
                            <li>&copy; 2023 Copyright Marta Barocela</li>
                        </ul>
                    </section>
                </footer>
            </div>
        </>
    );
}

export default Footer;