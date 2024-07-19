import { useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { Route, Routes } from 'react-router-dom'
import { useGetReservation } from '../../../shared/hooks/reservation/useGetReservation'
import { useGetHotels } from '../../../shared/hooks/hotels/useGetHotels'
import { CartView } from './CartView'

export const CartContent = () => {
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
        <Route path="cartView" element={<CartView rooms={reservation} hotels={hotels} getRooms={getReservation} />} />
      </Routes>
    </div>
  )
}