import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import { useDeleteEvent } from '../../shared/hooks/events/useDeleteEvent';
import { useSaveEvent } from '../../shared/hooks/events/useSaveEvent';
import { useUpdateEvent } from '../../shared/hooks/events/useUpdateEvent';
import { getEventsRequest, searchEventRequest, saveReservation } from '../../services/api';
import ReservationView from '../Reservation/ReservationView';
import '../Hotel/HotelStyle.css'




const useSelectedHotel = () => {
    const [selectedHotel, setSelectedHotel] = useState('');
    return { selectedHotel, setSelectedHotel };
};

const FormAdmin = ({ hotels, selectedHotel, setSelectedHotel, event, getEvents, setEditingEvent }) => {
    const { pathname } = useLocation()
    const hotelId = pathname.split('/').pop()
    const { save } = useSaveEvent();
    const { updateEvent } = useUpdateEvent();
    const [formData, setFormData] = useState({
        type: '',
        price: '',
        image: null
    });

    useEffect(() => {
        if (event) {
            setFormData({
                type: event.type,
                price: event.price,
                image: null,
            });
        }
    }, [event]);

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
            type: '',
            price: '',
            image: null
        });
        setEditingEvent(null);
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = null;
        }
    };

    const onHandleSave = async () => {
        try {
            const eventData = {
                type: formData.type,
                hotel: hotelId,
                price: formData.price,
                image: formData.image,
                state: 'FREE'
            };
            if (event) {
                await updateEvent(event._id, eventData);
            } else {
                await save(formData.type, hotelId, formData.price, formData.image);
            }
            getEvents(hotelId);
            clearForm();
        } catch (error) {
            console.error('Error con eventos', error);
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header bg-primary text-white text-center">
                        <h4 className="card-title mb-0">{event ? 'Actualizar Evento' : 'Agregar Evento'}</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
                                Tipo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                placeholder="Ingresa el tipo de evento"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Precio
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder="Ingresa el precio del evento"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Imagen
                            </label>
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
                                className="btn btn-success me-3"
                                onClick={onHandleSave}
                            >
                                {event ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
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
}

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>The Cutest</h5>
                        <p>Event | The Cutest</p>
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
    )
}

const ReservationButton = ({ event, onReserve }) => {
    return (
        <button
            className="btn btn-primary custom-button"
            onClick={() => onReserve(event)}
        >
            Disponible
        </button>
    )
}

export const EventView = ({ events, hotels, getEvents }) => {
    const { selectedHotel, setSelectedHotel } = useSelectedHotel();
    const userRole = localStorage.getItem('userRole');
    const [editingEvent, setEditingEvent] = useState(null);
    const [searchType, setSearchType] = useState('');
    const [searchedEvents, setSearchedEvents] = useState([]);
    const [showReservation, setShowReservation] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [event, setEvents] = useState([])
    const { pathname } = useLocation()
    const hotelId = pathname.split('/').pop()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEventsRequest(hotelId);
                console.log('Events fetched:', response); 
                setEvents(response);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [hotelId]);

    const { deleteEvent } = useDeleteEvent();

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId);
            getEvents(hotelId);
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setSelectedHotel(event.hotel ? event.hotel._id : '');
    };

    const handleSearch = async () => {
        try {
            const response = await searchEventRequest(hotelId, searchType);
            if (response.error) {
                toast.error('Error al buscar eventos: ' + response.err.response?.data?.message);
            } else {
                if (response.events.length > 0) {
                    setSearchedEvents(response.events);
                } else {
                    toast.error('No se encontraron eventos');
                    setSearchedEvents([]);
                }
            }
        } catch (error) {
            toast.error('Error al buscar eventos: ' + error.message);
        }
    };

    const handleCancelSearch = () => {
        setSearchedEvents([]);
        setSearchType('');
    };

    const handleReserveClick = async (event) => {
        try {
            await saveReservation(event._id);
            setSelectedEvent(event);
            setShowReservation(true);
            await getEvents(hotelId); 
        } catch (error) {
            console.error('Error reserving event:', error);
        }
    };

    const closeReservationModal = () => {
        setShowReservation(false);
        setSelectedEvent(null);
    };

    const handleReservationSaved = () => {
        setShowReservation(false);
        setSelectedEvent(null);
        getEvents(hotelId); 
    };

    return (
        <>
            <Navbar />
            {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                <FormAdmin
                    hotels={hotels}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                    event={editingEvent}
                    getEvents={getEvents}
                    setEditingEvent={setEditingEvent}
                />
            )}
            <br />
            {showReservation && selectedEvent && (
                <div className="reservation-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeReservationModal}>&times;</span>
                        <ReservationView event={selectedEvent} onClose={handleReservationSaved} />
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
                                placeholder="Buscar eventos por tipo"
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
                {(searchedEvents.length > 0 ? searchedEvents : events).map((event) => (
                    <div key={event._id} className="col-md-6 mb-4">
                        <div className="card h-100" style={{ fontSize: "1.2rem" }}>
                            <div className="card-body">
                            <div className="d-flex justify-content-center">
                                    <img
                                        src={`http://localhost:2656/event/getImg/${event._id}?timestamp=${Date.now()}`}
                                        className="hotel-image"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                                <h4 className="card-title">{event.type}</h4>
                                <h5 className="card-subtitle mb-2 text-muted">
                                <Link to={`/hotels/hotelView`} className="text-decoration-none">

                                    Hotel: {event.hotel ? event.hotel.name : 'sin hotel'}
                                </Link>
                                </h5>
                                <h5 className="card-subtitle mb-2 text-muted">Precio: {event.price}</h5>
                                <p className="card-subtitle mb-2 text-muted">Tipo: {event.type}</p>
                                <p className="card-subtitle mb-2 text-muted">Precio: Q.{event.price}</p>
                                <div className="d-flex justify-content-between">
                                {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEditEvent(event)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteEvent(event._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                                <ReservationButton event={event} onReserve={handleReserveClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    );
};
