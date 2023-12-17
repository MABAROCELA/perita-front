import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import '../css/ApiClima.css';

function Logout() {
    
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const response = await axios.post(
                `${URL_BACK}/users/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
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

    return (
        <div>
            <button className="apiButton" type="button" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}

export default Logout;
