import { useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import HabitacionesIcon from '../../assets/img/rooms_icon.png';
import EventosIcon from '../../assets/img/events_icon.png';
import ServiciosIcon from '../../assets/img/servicios_icon.png';
import { useDeleteHotel } from '../../shared/hooks/hotels/useDeleteHotel';
import { useSaveHotel } from '../../shared/hooks/hotels/useSaveHotel';
import { useUpdateHotel } from '../../shared/hooks/hotels/useUpdateHotel';
import { searchHotelRequest } from '../../services/api';
import './HotelStyle.css';
import toast from 'react-hot-toast';

const useSelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  return { selectedCategory, setSelectedCategory };
};

const FormAdmin = ({ categories, selectedCategory, setSelectedCategory, hotel, getHotels, setEditingHotel }) => {
  const { save } = useSaveHotel();
  const { updateHotel } = useUpdateHotel();
  const [formData, setFormData] = useState({
    nameT: '',
    ubication: '',
    phone: '',
    email: '',
    image: null,
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        nameT: hotel.name,
        ubication: hotel.ubication,
        phone: hotel.phone,
        email: hotel.email,
        image: null,
      });
      setSelectedCategory(hotel.category ? hotel.category._id : '');
    }
  }, [hotel, setSelectedCategory]);

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
      nameT: '',
      ubication: '',
      phone: '',
      email: '',
      image: null,
    });
    setEditingHotel(null);
    setSelectedCategory('')
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const onHandleSave = async () => {
    try {
      const hotelData = {
        name: formData.nameT,
        ubication: formData.ubication,
        phone: formData.phone,
        email: formData.email,
        image: formData.image,
      };
      if (hotel) {
        await updateHotel(hotel._id, hotelData);
      } else {
        await save(
          formData.nameT,
          selectedCategory,
          formData.ubication,
          formData.phone,
          formData.email,
          formData.image
        );
      }
      getHotels();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-6">
        <div className="card shadow-lg border-0 rounded-lg">
          <div className="card-header bg-primary text-white text-center">
            <h4 className="card-title mb-0">{hotel ? 'Actualizar Hotel' : 'Agregar Hotel'}</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="nameT" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nameT"
                placeholder="Ingresa el nombre"
                name="nameT"
                value={formData.nameT}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Categoría</label>
              <select
                id="category"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="ubication" className="form-label">Ubicación</label>
              <input
                type="text"
                className="form-control"
                id="ubication"
                placeholder="Ingresa la ubicación"
                name="ubication"
                value={formData.ubication}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Ingresa el teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingresa el email"
                name="email"
                value={formData.email}
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
                {hotel ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={clearForm}
              >
                Cancelar
              </button>
              <Link
                to="/category/categoryView"
                className="btn btn-secondary"
              >
                Categoría
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
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>The Cutest</h5>
            <p>Hotel | The Cutest</p>
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

export const HotelView = ({ hotels, categories, getHotels }) => {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const userRole = localStorage.getItem('userRole');
  const [editingHotel, setEditingHotel] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [foundHotels, setFoundHotels] = useState(null);

  const { deleteHotel } = useDeleteHotel();

  const handleDeleteHotel = async (hotelId) => {
    try {
      await deleteHotel(hotelId);
      getHotels();
    } catch (error) {
      console.error('Error al eliminar el hotel:', error);
    }
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setSelectedCategory(hotel.category ? hotel.category._id : '');
  };

  const handleSearch = async () => {
    try {
      const response = await searchHotelRequest(searchName);
      if (response.error) {
        toast.error('Error al buscar hoteles:', response.err);
      } else {
        console.log('Hoteles encontrados:', response.data.hotels);
        if (response.data.hotels.length > 0) {
          setFoundHotels(response.data.hotels);
        } else {
          toast.error('No se encontraron hoteles');
          setFoundHotels(null);
        }
      }
    } catch (error) {
      console.error('Error al buscar hoteles:', error);
    }
  };

  const handleCancelSearch = () => {
    setFoundHotels(null);
    setSearchName('');
  };

  return (
    <>
      <Navbar />
      {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
        <FormAdmin
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hotel={editingHotel}
          getHotels={getHotels}
          setEditingHotel={setEditingHotel}
        />
      )}
      <br />
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="input-group shadow-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar hoteles por nombre"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleSearch}>
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
        {(foundHotels !== null ? foundHotels : hotels).map((hotel) => (
          <div key={hotel._id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-lg hotel-card">
            <div className="d-flex justify-content-center">
                  <img
                    src={`http://localhost:2656/hotel/getImg/${hotel._id}?timestamp=${Date.now()}`}
                    className="hotel-image"
                    crossOrigin="anonymous"
                    alt="Hotel"
                  />
                </div>
              <div className="card-body">
                <h4 className="card-title">{hotel.name}</h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  <Link to={`/category/categoryView`} className="text-decoration-none">
                    Categoría: {hotel.category ? hotel.category.name : 'Sin categoría'}
                  </Link>
                </h5>
                <p className="card-text">Ubicación: {hotel.ubication}</p>
                <p className="card-text">Teléfono: {hotel.phone}</p>
                <p className="card-text">Email: {hotel.email}</p>
                <div className="d-flex justify-content-end mb-3">
                  {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                    <>
                      <button
                        type="button"
                        className="btn btn-warning me-2"
                        onClick={() => handleEditHotel(hotel)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => handleDeleteHotel(hotel._id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-between">  
                  <Link to={`/rooms/roomsView/${hotel._id}`}>
                    <img src={HabitacionesIcon} alt="Habitaciones" className='img-content' />
                  </Link>
                  <Link to={`/events/eventView/${hotel._id}`} >
                    <img src={EventosIcon} alt="Eventos" className='img-content'/>
                  </Link>
                  <Link to={`/services/serviceView/${hotel._id}`} >
                    <img src={ServiciosIcon} alt="Servicios" className='img-content' />
                  </Link>
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
