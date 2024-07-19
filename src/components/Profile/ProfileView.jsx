import { useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { useUpdateUser } from '../../shared/hooks/user/userUpdate';
import { useDeleteUser } from '../../shared/hooks/user/useDeleteUser';
import { searchUserRequest } from '../../services/api';
import toast from 'react-hot-toast';
import { useLogout } from '../../shared/hooks/useLogout.jsx';

export const ProfileView = ({ users, getUsers }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const { updateUser } = useUpdateUser();
    const { deleteUser } = useDeleteUser();
    const [searchType, setSearchType] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(users._id);

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        role: ''
    });
    const initializeFormData = (user) => {
        setFormData({
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
        setCurrentUserId(user._id);
    };

    useEffect(() => {
        initializeFormData(users);
    }, [users]);

    useEffect(() => {
        if (searchedUsers.length > 0) {
            const user = searchedUsers[0]
            initializeFormData(user)
            setIsSearching(true)
        }
    }, [searchedUsers]);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSearch = async () => {
        try {
            const response = await searchUserRequest(searchType);
            if (response.error) {
                toast.error('Error al buscar usuarios: ' + response.err.response?.data?.message);
            } else {
                if (response.data.user.length > 0) {
                    setSearchedUsers(response.data.user);
                } else {
                    toast.error('No se encontraron usuarios');
                    setSearchedUsers([]);
                }
            }
        } catch (error) {
            toast.error('Error al buscar usuarios: ' + error.message);
        }
    };

    const handleEditUser = () => {
        setIsEditing(true);
    };

    const handleSaveUser = async () => {
        await updateUser(currentUserId, formData)
        setIsEditing(false)
        setSearchType('')
        if (currentUserId === users._id && formData.role !== users.role) {
            localStorage.setItem('userRole', formData.role);
        }
        getUsers();
    }

    const handleDeleteUser = async () => {
        try {
            await deleteUser(currentUserId)
            if (currentUserId === users._id) {
                useLogout()
            } else {
                getUsers()
            }

        } catch (error) {
            console.error('Error al eliminar el usuario:', error)
        }
    };

    const handleCancelSearch = () => {
        setSearchType('')
        setSearchedUsers([])
        setIsSearching(false)
        initializeFormData(users)
    }

    const userRole = localStorage.getItem('userRole');

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Perfil del Usuario</h2>
                {userRole === "ADMIN" && (
                <div className="container">
                    <div className="row justify-content-center mb-4">
                        <div className="col-md-8">
                            <div className="input-group shadow-sm">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar usuarios por username"
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handleSearch}>
                                    Buscar
                                </button>
                                <button className="btn btn-secondary ms-2" onClick={handleCancelSearch}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <div className="card shadow-lg">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        {userRole === "ADMIN" && (
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                >
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="CLIENT">CLIENT</option>
                                </select>
                            </div>
                        )}
                        <div className="d-flex justify-content-between">
                            {!isEditing ? (
                                <button
                                    type="button"
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={handleEditUser}
                                >
                                    Editar
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm me-2"
                                        onClick={handleSaveUser}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={handleDeleteUser}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
