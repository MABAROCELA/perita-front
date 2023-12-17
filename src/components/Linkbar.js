import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

function Linkbar() {
    
    const { isAuthenticated, user, logout } = useAuth();
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            const URL_BACK = process.env.REACT_APP_BACK_URL;

            const response = await axios.post(
                `${URL_BACK}/users/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                localStorage.removeItem("jwtToken");
                console.log('Cierre de sesión exitoso');
                logout();
            } else {
                console.error('Error en el cierre de sesión:', response.status);

                if (response.status === 401) {
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error en la solicitud de cierre de sesión', error);
        } finally {
            navigate('/');
        }
    };

    const renderNavItems = () => {
        if (isAuthenticated) {

            if (user.role === 'admin') {
                return (
                    <>
                        <Nav.Item>
                            <Link to="/users" className="enlace">GESTIÓN USUARIOS</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/products" className="enlace">GESTION PRODUCTOS</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/ListaProductos" className="enlace">VER COLECCIÓN</Link>
                        </Nav.Item>
                        <div className="saludo">
                            <p>Hola, {user.username}</p>
                            <Button variant="light" size="sm" onClick={handleLogout}>
                                Cerrar sesión
                            </Button>
                        </div>
                    </>
                );
            } else if (user.role === 'client') {
                return (
                    <>
                        <Nav.Item>
                            <Link to="/" className="enlace">HOME</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/ListaProductos" className="enlace">FW23</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link eventkey="disabled" disabled className="enlace">MI CARRITO</Link>
                        </Nav.Item>
                        <div className="saludo">
                            <p>Hola, {user.username}</p>
                            <Button variant="light" size="sm" onClick={handleLogout}>
                                Cerrar sesión
                            </Button>
                        </div>
                    </ >
                );
            }
        } else {

            return (
                <>
                    <Nav.Item>
                        <Link to="/" className="enlace">HOME</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/users/newUser" className="enlace">REGISTER</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/users/login" className="enlace">LOGIN</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/users/login" className="enlace">FW23</Link>
                    </Nav.Item>
                </>
            );
        }
    };

    return (
        <Nav className='linkbarContainer container justify-content-around text-center mt-4 mb-1'>
            {renderNavItems()}
        </Nav>
    );
}

export default Linkbar;
