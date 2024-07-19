import { useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { Route, Routes, useLocation } from 'react-router-dom'
import {EventView} from './EventView.jsx'
import { useGetEvents } from '../../shared/hooks/events/useGetEvents'
import { useGetHotels } from '../../shared/hooks/hotels/useGetHotels.jsx'

export const EventContent = () => {
  const { pathname } = useLocation()
  const { events, getEvents, isFetching: isFetchingEvents } = useGetEvents()
  const { hotels, getHotels, isFetching: isFetchingHotels} = useGetHotels()

  const hotelId = pathname.split('/').pop()


  useEffect(() =>{
    getEvents(hotelId),
    getHotels()
  }, [])

  if(isFetchingEvents || isFetchingHotels){
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
          <PacmanLoader color="#ffe733"/>
        </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path="eventView/:hotelId" element = {<EventView events={events} hotels={hotels} getEvents={getEvents}/>} />
      </Routes>
    </div>
  )
}

