import React, { useState, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDeleteRoom } from '../../shared/hooks/rooms/useDeleteRooms';
import { useSaveRoom } from '../../shared/hooks/rooms/useSaveRooms';
import { useUpdateRoom } from '../../shared/hooks/rooms/useUpdateRooms';
import { getRoomsRequest, searchRoomRequest, saveReservation } from '../../services/api';
import toast from 'react-hot-toast';
import ReservationView from '../Reservation/ReservationView';
import '../Hotel/HotelStyle.css'


const useSelectedHotel = () => {
    const [selectedHotel, setSelectedHotel] = useState('');
    return { selectedHotel, setSelectedHotel };
};

const FormAdmin = ({ hotels, selectedHotel, setSelectedHotel, room, getRooms, setEditingRoom }) => {
    const { save } = useSaveRoom();
    const { updateRoom } = useUpdateRoom();
    const { pathname } = useLocation();
    const hotelId = pathname.split('/').pop();

    const [formData, setFormData] = useState({
        roomName: '',
        description: '',
        price: '',
        image: null,
    });

    useEffect(() => {
        if (room) {
            setFormData({
                roomName: room.roomName,
                description: room.description,
                price: room.price,
                image: null,
            });
        }
    }, [room]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                image: e.target.files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const clearForm = () => {
        setFormData({
            roomName: '',
            description: '',
            price: '',
            image: null,
        });
        setEditingRoom(null);
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = null;
        }
    };

    const onHandleSave = async () => {
        try {
            const roomData = {
                roomName: formData.roomName,
                hotel: hotelId,
                description: formData.description,
                price: formData.price,
                image: formData.image,
                state: 'FREE'
            };
            if (room) {
                await updateRoom(room._id, roomData);
            } else {
                await save(formData.roomName, hotelId, formData.description, formData.price, formData.image);
            }
            await getRooms(hotelId);
            clearForm();
        } catch (error) {
            console.error('Error con habitaciones', error);
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header bg-primary text-white text-center">
                        <h4 className="card-title mb-0">{room ? 'Actualizar Habitación' : 'Agregar Habitación'}</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="roomName" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomName"
                                placeholder="Ingresa el nombre"
                                name="roomName"
                                value={formData.roomName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Ingresa la descripción"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Ingresa el precio"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Imagen</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={onHandleSave}
                            >
                                {room ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger me-3"
                                onClick={clearForm}
                            >
                                Cancelar
                            </button>
                            <Link
                                to="/hotels/hotelView"
                                className="btn btn-secondary"
                            >
                                Hotel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center" style={{ marginTop: 'auto' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>The Cutest</h5>
                        <p>Habitaciones | The Cutest</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Dirección</h5>
                        <p>Guatemala, Guatemala City</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Contacto</h5>
                        <p>Teléfono: +502 0000 0000</p>
                        <p>Email: thecutest@gmail.com</p>
                    </div>
                </div>
                <div className="mt-3">
                    <p>&copy; {new Date().getFullYear()} The Cutest. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};


const ReservationButton = ({ room, onReserve }) => {
    return (
        <button
            className="btn btn-primary custom-button"
            onClick={() => onReserve(room)}
        >
            Disponible
        </button>
    );
};

export default ReservationButton;


export const RoomsView = ({ rooms, hotels, getRooms }) => {
    const { selectedHotel, setSelectedHotel } = useSelectedHotel();
    const userRole = localStorage.getItem('userRole');
    const [editingRoom, setEditingRoom] = useState(null);
    const [searchType, setSearchType] = useState('');
    const [searchedRooms, setSearchedRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showReservation, setShowReservation] = useState(false);
    const [room, setRooms] = useState([]); 
    const { pathname } = useLocation();
    const hotelId = pathname.split('/').pop();

    const { deleteRoom } = useDeleteRoom();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getRoomsRequest(hotelId);
                console.log('Rooms fetched:', response); // Añade este log
                setRooms(response);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, [hotelId]);

    const handleDeleteRoom = async (roomId) => {
        try {
            await deleteRoom(roomId);
            getRooms(hotelId);
        } catch (error) {
            console.error('Error al eliminar la habitación:', error);
        }
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setSelectedHotel(room.hotel ? room.hotel._id : '');
    };

    const handleSearch = async () => {
        try {
            const response = await searchRoomRequest(searchType);
            if (response.error) {
                toast.error('Error al buscar habitaciones: ' + response.err.response?.data?.message);
            } else {
                if (response.rooms.length > 0) {
                    setSearchedRooms(response.rooms);
                } else {
                    toast('No se encontraron habitaciones');
                    setSearchedRooms([]);
                }
            }
        } catch (error) {
            toast.error('Error al buscar habitaciones: ' + error.message);
        }
    };

    const handleCancelSearch = () => {
        setSearchedRooms([]);
        setSearchType('');
    };

    const handleReserveClick = async (room) => {
        try {
            await saveReservation(room._id);
            setSelectedRoom(room);
            setShowReservation(true);
            await getRooms(hotelId); // Actualiza la lista de habitaciones después de reservar
        } catch (error) {
            console.error('Error reserving room:', error);
        }
    };

    const closeReservationModal = () => {
        setShowReservation(false);
        setSelectedRoom(null);
    };

    const handleReservationSaved = () => {
        setShowReservation(false);
        setSelectedRoom(null);
        getRooms(hotelId); // Update rooms to reflect new reservation status
    };

    return (
        <>
            <Navbar />
            {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                <FormAdmin
                    hotels={hotels}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                    room={editingRoom}
                    getRooms={getRooms}
                    setEditingRoom={setEditingRoom}
                />
            )}
            <br />
            {showReservation && selectedRoom && (
                <div className="reservation-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeReservationModal}>&times;</span>
                        <ReservationView room={selectedRoom} onClose={handleReservationSaved} />
                    </div>
                </div>
            )}
            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="input-group shadow-sm">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar habitaciones por tipo"
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
            <div className="row mx-4">
                {(Array.isArray(searchedRooms) && searchedRooms.length > 0 ? searchedRooms : Array.isArray(rooms) ? rooms : []).map((room) => (
                    <div key={room._id} className="col-md-6 mb-4">
                        <div className="card h-100" style={{ fontSize: "1.2rem" }}>
                            <div className="card-body">
                            <div className="d-flex justify-content-center">
                                    <img
                                        src={`http://localhost:2656/room/getImg/${room._id}?timestamp=${Date.now()}`}
                                        className="hotel-image"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                                <h4 className="card-title">{room.roomName}</h4>
                                <h5 className="card-subtitle mb-2 text-muted">
                                    <Link to={`/hotels/hotelView`} className="text-decoration-none">
                                        Hotel: {room.hotel ? room.hotel.name : 'sin hotel'}
                                    </Link>
                                </h5>
                                <p className="card-subtitle mb-2 text-muted">Descripción: {room.description}</p>
                                <p className="card-subtitle mb-2 text-muted">Precio: Q.{room.price}</p>
                                <div className="d-flex justify-content-between">
                                {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditRoom(room)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger "
                                                onClick={() => handleDeleteRoom(room._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                    <ReservationButton room={room} onReserve={handleReserveClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};
