import toast from "react-hot-toast"
import { getHotelRequest } from "../../../services/api"
import { useState } from "react"

export const useGetHotels = () => {
    const [ hotels, setHotels ] = useState(null)

    const getHotels = async() => {
        const response = await getHotelRequest()
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.messagge || 
                'Error al obtener los hoteles'
            )
        }
        setHotels(response.data)
    }
    return {
        hotels, 
        isFetching: !hotels,
        getHotels
    }
}

