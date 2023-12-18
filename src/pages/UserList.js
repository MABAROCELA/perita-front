import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/UserList.css'

const Usuarios = () => {

    const [users, setUsers] = useState([]);
    const [editedRole, setEditedRole] = useState('');
    const [editedUser, setEditedUser] = useState({
        _id: '',
        username: '',
        password: '',
        email: '',
        role: '',
    });

    const [editModes, setEditModes] = useState({});

    const URL_BACK = process.env.REACT_APP_BACK_URL;

    const getUsers = async () => {
        try {
            const { data } = await axios.get(`${URL_BACK}/users`);
            setUsers(data.users);
            console.log('Lista de usuarios obtenida');
            const initialEditModes = data.users.reduce((modes, user) => {
                modes[user._id] = false;
                return modes;
            }, {});
            setEditModes(initialEditModes);
        } catch (error) {
            console.error('Error al obtener lista de usuarios:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleDelete = async (userId) => {

        try {
            const response = await axios.delete(`${URL_BACK}/users/delete/${userId}`);
            const { success, message } = response.data;

            if (success) {
                setUsers(users.filter((user) => user._id !== userId));
                console.log(`Usuario eliminado con éxito. Mensaje: ${message}`);
            } else {
                console.error(`Error al eliminar usuario. Mensaje: ${message}`);
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    const handleEdit = (user) => {
        const updatedEditModes = { ...editModes };
        Object.keys(updatedEditModes).forEach((key) => {
            updatedEditModes[key] = key === user._id;
        });
        setEditModes(updatedEditModes);
        setEditedUser({ ...user });
        setEditedRole(user.role);
    };

    const handleUpdateUser = async () => {

        try {
            const response = await axios.put(`${URL_BACK}/users/edit/${editedUser._id}`, {
                username: editedUser.username,
                password: editedUser.password,
                email: editedUser.email,
                role: editedRole,
            });

            const { success, user, message } = response.data;

            if (success) {
                setEditModes((prevModes) => ({ ...prevModes, [user._id]: false }));
                setUsers((prevUsers) =>
                    prevUsers.map((u) => (u._id === user._id ? user : u))
                );
                console.log('Usuario actualizado exitosamente');
                alert('Usuario actualizado con éxito');
            } else {
                console.error(message || 'Error desconocido al actualizar usuario');
            }
        } catch (error) {
            console.error(
                'Error al actualizar usuario:',
                error.message || 'Error desconocido'
            );
        }
    };

    const handleExitEditMode = () => {
        setEditModes((prevModes) => ({ ...prevModes, [editedUser._id]: false }));
        setEditedUser({
            _id: '',
            username: '',
            password: '',
            email: '',
        });
        setEditedRole('');
    };

    return (
        <>
            <div className='user-list'>
                <h4 className="text-center">USUARIOS REGISTRADOS</h4>
                <div className="text-center container m-5">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Usuario</th>
                                <th>Contraseña</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>
                                        {editModes[user._id] ? (
                                            <input
                                                type="text"
                                                value={editedUser.username}
                                                onChange={(e) =>
                                                    setEditedUser({ ...editedUser, username: e.target.value })
                                                }
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td>
                                        {editModes[user._id] ? (
                                            <input
                                                type="password"
                                                value={editedUser.password}
                                                onChange={(e) =>
                                                    setEditedUser({ ...editedUser, password: e.target.value })
                                                }
                                            />
                                        ) : (
                                            user.password
                                        )}
                                    </td>
                                    <td>
                                        {editModes[user._id] ? (
                                            <input
                                                type="email"
                                                value={editedUser.email}
                                                onChange={(e) =>
                                                    setEditedUser({ ...editedUser, email: e.target.value })
                                                }
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td>
                                        {editModes[user._id] ? (
                                            <>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value="admin"
                                                        checked={editedRole === 'admin'}
                                                        onChange={() => setEditedRole('admin')}
                                                    />
                                                    Admin
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value="client"
                                                        checked={editedRole === 'client'}
                                                        onChange={() => setEditedRole('client')}
                                                    />
                                                    Cliente
                                                </label>
                                            </>
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td>
                                        {editModes[user._id] ? (
                                            <>
                                                <button className="userButton" onClick={handleUpdateUser}>
                                                    Confirmar cambios
                                                </button>
                                                <button className="userButton" onClick={handleExitEditMode}>CANCELAR</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className='userButton' onClick={() => handleEdit(user)}>EDITAR</button>
                                                <button className='userButton' onClick={() => handleDelete(user._id)}>
                                                    ELIMINAR
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    
                    <Link to="/users/newUser">
                        <button className="newUserButton" type="button">AGREGAR USUARIO</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Usuarios;