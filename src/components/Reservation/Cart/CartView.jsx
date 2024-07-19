import React, { useState, useEffect } from 'react';
import { Navbar } from '../../navbar/Navbar';
import { getReservationRequest, deleteReservationRequest, downloadInvoiceRequest } from '../../../services/api';
import toast from 'react-hot-toast';
import { FaFilePdf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 text-center" style={{ marginTop: 'auto' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>The Cutest</h5>
            <p>Carrito-Reservaciones | The Cutest</p>
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

export const CartView = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await getReservationRequest();
      if (!response.error) {
        setReservations(response.data.reservations);
      } else {
        toast.error('Error al obtener las reservaciones');
      }
    } catch (error) {
      toast.error('Error al obtener las reservaciones');
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      const response = await deleteReservationRequest(reservationId);
      if (!response.error) {
        toast.success('Reservación eliminada con éxito');
        fetchReservations(); // Refresca la lista de reservaciones
      } else {
        toast.error('Error al eliminar la reservación');
      }
    } catch (error) {
      toast.error('Error al eliminar la reservación');
    }
  };

  const handleGenerateInvoice = async (reservationId) => {
    try {
      const response = await downloadInvoiceRequest(reservationId);
      if (response && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `factura_${reservationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success('Factura generada y descargada con éxito');
      } else {
        toast.error('Error al generar la factura: La respuesta no contiene datos');
      }
    } catch (error) {
      console.error('Error al generar la factura:', error);
      toast.error('Error al generar la factura');
    }
  };

  return (
    <div className="main-content">
      <Navbar />
      <div className="container mt-5">
        <h2>Mis Reservaciones</h2>
        
        <div className="row">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation._id} className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    {reservation.room && (
                      <>
                        <h4 className="card-title">Habitación: {reservation.room.roomName}</h4>
                        <p className="card-subtitle mb-2 text-muted">
                          Hotel: {reservation.room.hotel ? reservation.room.hotel.name : 'sin hotel'}
                        </p>
                        <p className="card-text">Descripción: {reservation.room.description}</p>
                        <p className="card-text">Precio: Q.{reservation.room.price}</p>
                        <p className="card-text">Fecha de inicio: {new Date(reservation.startDate).toLocaleDateString()}</p>
                        <p className="card-text">Fecha de fin: {new Date(reservation.endDate).toLocaleDateString()}</p>
                        <div className="d-flex justify-content-between mt-3">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteReservation(reservation._id)}
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleGenerateInvoice(reservation._id)}
                          >
                            <FaFilePdf /> Factura
                          </button>
                        </div>
                      </>
                    )}
                    {reservation.event && (
                      <>
                        <h4 className="card-title">Evento: {reservation.event.type}</h4>
                        <p className="card-text">Precio: Q.{reservation.event.price}</p>
                        <p className="card-text">Fecha de inicio: {new Date(reservation.startDate).toLocaleDateString()}</p>
                        <p className="card-text">Fecha de fin: {new Date(reservation.endDate).toLocaleDateString()}</p>
                        <div className="d-flex justify-content-between mt-3">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteReservation(reservation._id)}
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleGenerateInvoice(reservation._id)}
                          >
                            <FaFilePdf /> Factura
                          </button>
                        </div>
                      </>
                    )}
                    {reservation.service && (
                      <>
                        <h4 className="card-title">Servicio: {reservation.service.type}</h4>
                        <p className="card-text">Precio: Q.{reservation.service.price}</p>
                        <div className="d-flex justify-content-between mt-3">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteReservation(reservation._id)}
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleGenerateInvoice(reservation._id)}
                          >
                            <FaFilePdf /> Factura
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes reservaciones.</p>
          )}
        </div>
      </div><br/><br/>
      <Footer />
    </div>
  );
};
