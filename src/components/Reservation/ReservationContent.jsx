import { useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { Route, Routes } from 'react-router-dom'
import ReservationView from './ReservationView'
import { useGetReservation } from '../../shared/hooks/reservation/useGetReservation'
import { useGetHotels } from '../../shared/hooks/hotels/useGetHotels'

export const ReservationContent = () => {
  const { reservation, getReservation, isFetching: isFetchingReservation } = useGetReservation()
  const { hotels, getHotels, isFetching: isFetchingHotels } = useGetHotels()

  useEffect(() => {
    getReservation(),
        getHotels()
  }, [])
  console.log(reservation)
  if (isFetchingReservation || isFetchingHotels) {
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <PacmanLoader color="#ffe733" />
      </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path="reservationView" element={<ReservationView rooms={reservation} hotels={hotels} getRooms={getReservation} />} />
      </Routes>
    </div>
  )
}

