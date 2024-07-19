import { useEffect } from "react";
import { PacmanLoader } from 'react-spinners'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ServiceView } from './ServiceView.jsx'
import { useGetServices} from '../../shared/hooks/service/useGetService.jsx'
import { useGetHotels } from "../../shared/hooks/hotels/useGetHotels.jsx";

export const ServiceContent = () => {
    const { pathname } = useLocation()
    const { services, getServices, isFetching: isFetchingServices } = useGetServices()
    const { hotels, getHotels, isFetching: isFetchingHotels} = useGetHotels()
  
    const hotelId = pathname.split('/').pop()

    useEffect(() =>{
      getServices(hotelId),
      getHotels()
    }, [])
    console.log(services)
    if(isFetchingServices || isFetchingHotels){
      return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <PacmanLoader color="#ffe733"/>
          </div>
      )
    }
    return (
      <div>
        <Routes>
          <Route path="serviceView/:hotelId" element = {<ServiceView services={services} hotels={hotels} getServices={getServices}/>} />
        </Routes>
      </div>
    )
  }
  