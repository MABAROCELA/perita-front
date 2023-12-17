import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import '../css/Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async () => {

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const response = await axios.post(
                `${URL_BACK}/users/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                
                login(response.data.user);
                console.log('Inicio de sesión exitoso');
                localStorage.setItem("jwtToken", response.data.token); 
                document.cookie = `token=${response.data.token}; path=/;`;
                navigate('/bienvenida');
            }
        } catch (error) {

            setError("Las credenciales son incorrectas");
            console.error('Error en la solicitud de inicio de sesión', error);

        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="loginEmail">
                        <div className="login-label">Email</div>
                        <input
                            type="email"
                            id="loginEmail"
                            name="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="loginPassword">
                        <div className="login-label">Contraseña</div>
                        <input
                            type="password"
                            id="loginPassword"
                            name="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <div className="login-error-message">{error}</div>}
                    <div className="login-button-container">
                        <button className="login-button" type="button" onClick={handleLogin}>
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;