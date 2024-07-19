import React, { useState } from 'react';
import { saveReservation } from '../../services/api';
import toast from 'react-hot-toast';

const ReservationView = ({ room, event, onClose, service }) => {
  const [reservationData, setReservationData] = useState({
    room: room?._id || null,
    event: event?._id || null,
    service: service?._id || null,
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const validateDates = () => {
    const { startDate, endDate } = reservationData;
    const currentDate = new Date();
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    if (selectedStartDate < currentDate || selectedEndDate < currentDate) {
      toast.error('Las fechas seleccionadas están en el pasado');
      return false;
    }

    if (selectedStartDate > selectedEndDate) {
      toast.error('La fecha de fin no puede ser anterior a la fecha de inicio');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }

    try {
      const response = await saveReservation(reservationData);
      if (!response.error) {
        toast.success('Reserva guardada exitosamente');
        onClose();
      } else {
        toast.error('Error al guardar la reserva');
      }
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      toast.error('Error al guardar la reserva');
    }
  };

  return (
    <div>
      <h2 style={{ color: 'white' }}>
      {room ? `Reserve Room: ${room.roomName}` : event ? `Reserve Event: ${event.type}` : `Reserve Service: ${service.type}`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label" style={{ color: 'white' }}>Fecha de inicio:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={reservationData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label" style={{ color: 'white' }}>Fecha de fin:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={reservationData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Reservar</button>
      </form>
    </div>
  );
};

export default ReservationView;
