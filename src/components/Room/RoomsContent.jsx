import { useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RoomsView } from './RoomsView'
import { useGetRooms } from '../../shared/hooks/rooms/useGetRooms'
import { useGetHotels } from '../../shared/hooks/hotels/useGetHotels'

export const RoomContent = () => {
  const { pathname } = useLocation()
  const { rooms, getRooms, isFetching: isFetchingRooms } = useGetRooms()
  const { hotels, getHotels, isFetching: isFetchingHotels } = useGetHotels()


  const hotelId = pathname.split('/').pop()

  useEffect(() => {
    getRooms(hotelId),
        getHotels()
  }, [])
  if (isFetchingRooms || isFetchingHotels) {
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <PacmanLoader color="#ffe733" />
      </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path="roomsView/:hotelId" element={<RoomsView rooms={rooms} hotels={hotels} getRooms={getRooms} />} />
      </Routes>
    </div>
  )
}

