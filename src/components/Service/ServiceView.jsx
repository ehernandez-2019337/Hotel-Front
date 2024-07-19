import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { useDeleteService } from '../../shared/hooks/service/useDeleteService';
import { useSaveService } from '../../shared/hooks/service/useSaveService';
import { useUpdateService } from '../../shared/hooks/service/useUpdateService';
import { getServicesRequest, searchServiceRequest, saveReservation } from "../../services/api";
import ReservationView from '../Reservation/ReservationView';

const useSelectedHotel = () => {
    const [selectedHotel, setSelectedHotel] = useState('');
    return { selectedHotel, setSelectedHotel };
};

const FormAdmin = ({ hotels, selectedHotel, setSelectedHotel, service, getServices, setEditingService }) => {
    const { pathname } = useLocation()
    const hotelId = pathname.split('/').pop()
    const { save } = useSaveService();
    const { updateService } = useUpdateService();
    const [formData, setFormData] = useState({
        type: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        if (service) {
            setFormData({
                type: service.type,
                price: service.price,
                description: service.description
            });        }
    }, [service]);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const clearForm = () => {
        setFormData({
            type: '',
            price: '',
            description: '',
        })
        setEditingService(null);
    }

    const onHandleSave = async () => {
        try {
            const serviceData = {
                type: formData.type,
                hotel: hotelId,
                price: formData.price,
                description: formData.description
            };
            if (service) {
                await updateService(service._id, serviceData);
            } else {
                await save(formData.type, hotelId, formData.price, formData.description);
            }
            getServices(hotelId);
            clearForm();
        } catch (error) {
            console.error('Error con servicios', error);
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header bg-primary text-white text-center">
                        <h4 className="card-title mb-0">{service ? 'Actualizar servicio' : 'Agregar Servicio'}</h4>
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
                                placeholder="Ingresa el tipo de servicio"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
                                Description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Ingresa la descripción de servicio"
                                name="description"
                                value={formData.description}
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
                                placeholder="Ingresa el precio del servicio"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-success me-3"
                                onClick={onHandleSave}
                            >
                                {service ? 'Actualizar' : 'Guardar'}
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
                        <p>service | The Cutest</p>
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

const ReservationButton = ({ service, onReserve }) => {
    const isReserved = service.state !== 'FREE';
    console.log('Service state:', service.state); 

    return (
        <button
            className={`btn ${isReserved ? 'btn-secondary' : 'btn-primary'} custom-button`}
            onClick={() => !isReserved && onReserve(service)}
            disabled={isReserved}
        >
            {isReserved ? 'Reservado' : 'Disponible'}
        </button>
    );
};

export const ServiceView = ({ services, hotels, getServices }) => {
    const { selectedHotel, setSelectedHotel } = useSelectedHotel();
    const userRole = localStorage.getItem('userRole');
    const [editingService, setEditingService] = useState(null);
    const [searchType, setSearchType] = useState('');
    const [searchedService, setSearchedServices] = useState([]);
    const [showReservation, setShowReservation] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [service, setServices] = useState([])
    const { pathname } = useLocation()
    const hotelId = pathname.split('/').pop()

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServicesRequest(hotelId);
                console.log('Services fetched:', response); 
                setServices(response);
            } catch (error) {
                console.error('Error fetching Services:', error);
            }
        };

        fetchServices();
    }, [hotelId]);

    const { deleteService} = useDeleteService();

    const handleDeleteService = async (serviceId) => {
        try {
            await deleteService(serviceId);
            getServices(hotelId);
        } catch (error) {
            console.error('Error al eliminar el servicios:', error);
        }
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setSelectedHotel(service.hotel ? service.hotel._id : '');
    };

    const handleSearch = async () => {
        try {
            const response = await searchServiceRequest(hotelId, searchType)
            if (response.error) {
                toast.error('Error al buscar servicios: ' + response.err.response?.data?.message);
            } else {
                if (response.services.length > 0) {
                    setSearchedServices(response.services);
                } else {
                    toast('No se encontraron servicios');
                    setSearchedServices([]);
                }
            }
        } catch (error) {
            console.error(error)
            toast.error('Error al buscar servicios: ' + error.message);
        }
    };

    const handleCancelSearch = () => {
        setSearchedServices([]);
        setSearchType('');
    };

    const handleReserveClick = async (service) => {
        try {
            await saveReservation(service._id);
            setSelectedService(service);
            setShowReservation(true);
            await getServices(hotelId); 
        } catch (error) {
            console.error('Error reserving service:', error);
        }
    };

    const closeReservationModal = () => {
        setShowReservation(false);
        setSelectedService(null);
    };

    const handleReservationSaved = () => {
        setShowReservation(false);
        setSelectedService(null);
        getServices(hotelId); 
    };


    return (
        <>
            <Navbar />
            {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                <FormAdmin
                    hotels={hotels}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                    service={editingService}
                    getServices={getServices}
                    setEditingService={setEditingService}
                />
            )}
            <br />
            {showReservation && selectedService && (
                <div className="reservation-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeReservationModal}>&times;</span>
                        <ReservationView service={selectedService} onClose={handleReservationSaved} />
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
                                placeholder="Buscar service por tipo"
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
            {(Array.isArray(searchedService) && searchedService.length > 0 ? searchedService : Array.isArray(services) ? services : []).map((service) => (
                    <div key={service._id} className="col-md-6 mb-4">
                        <div className="card h-100" style={{ fontSize: "1.2rem" }}>
                            <div className="card-body">
                                <h4 className="card-title">{service.type}</h4>
                                <h5 className="card-subtitle mb-2 text-muted">Description: {service.description}</h5>
                                <h5 className="card-subtitle mb-2 text-muted">
                                    Hotel: {service.hotel ? service.hotel.name : 'sin hotel'}
                                </h5>
                                <h5 className="card-subtitle mb-2 text-muted">Precio: {service.price}</h5>
                                <div className="d-flex justify-content-between">
                                {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEditService(service)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => handleDeleteService(service._id)}
                                        >
                                            Eliminar
                                        </button>
                                        
                                    </>
                                )}
                                <ReservationButton service={service} onReserve={handleReserveClick} />
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
