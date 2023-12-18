import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/NewUser.css';

function NewUser() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const response = await axios.post(
                `${URL_BACK}/users/newUser`,

                {
                    username,
                    password,
                    email
                });

            if (response.status === 200) {
                console.log('Usuario creado con exito');
                alert('Usuario creado con exito');
                navigate('/users/login');

                setUsername('');
                setPassword('');
                setEmail('');

            } else {
                
                console.log(error);
            }

        } catch (error) {

            setError("El email ingresado ya está regsitrado");
            console.error('Error en la solicitud de registro', error);

        }
    };


    return (
        <>
            <div className="register-body">
                <div className="register-container">
                    <form
                        className='register-form'
                        onSubmit={handleSubmit}>
                        <label
                            htmlFor="registerUsername">
                            <div className="register-label">
                                Usuario
                            </div>
                            <input
                                type="text"
                                id="registerUsername"
                                name="username"
                                className="register-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label
                            htmlFor="registerPassword">
                            <div className="register-label">
                                Contraseña
                            </div>
                            <input
                                type="password"
                                id="registerPassword"
                                name="password"
                                className="register-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label
                            htmlFor="registerEmail">
                            <div className="register-label">
                                Email
                            </div>

                            <input
                                type="email"
                                id="registerEmail"
                                name="email"
                                className="register-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <div className="register-button-container ">
                            {error && <div className="register-error-message">{error}</div>}
                            <button
                                className="register-button"
                                type="submit"
                                >
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
}

export default NewUser;