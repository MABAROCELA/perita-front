import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'
import Error from '../pages/Error';
import ApiClima from '../components/ApiClima'
import '../css/Bienvenida.css'


function Bienvenida() {

    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleNavigateUsers = () => {
        navigate('/users');
    }

    const handleNavigateProducts= () => {
        navigate('/products');
    }

    const renderBienvenida = () => {
        if (isAuthenticated) {
            if (user.role === 'client') {
                return (
                    <>
                        <div className="bienvenida">
                            <p className="titulo-client">Hola  {user.username}!</p>
                            <div className='api'>
                                <ApiClima />
                            </div>
                        </div>
                    </>
                );
            } else if (user.role === 'admin') {
                return (
                    <>
                        <div className='adminPanel'>
                            <p className="titulo-admin">Hola  {user.username}!</p>
                            <div className="adminBotones">
                                <button className='adminButton' onClick={handleNavigateUsers}>GESTION USUARIOS</button>
                                <button className='adminButton' onClick={handleNavigateProducts}>GESTION PRODUCTOS</button>
                            </div>
                        </div>
                    </>
                );
            }
        } else {
            return (
                <Error />
            );
        }
    };

    return (
        <div>
            {renderBienvenida()}
        </div>
    );
}

export default Bienvenida;
