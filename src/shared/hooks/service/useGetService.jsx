import toast from "react-hot-toast";
import { getServicesRequest } from "../../../services/api";
import { useState } from "react";

export const useGetServices = () => {
    const [ services, setServices ] = useState(null)

    const getServices = async(id) => {
        const response = await getServicesRequest(id)
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.messagge || 
                'Error al obtener los servicios'
            )
        }
        setServices(response.data)
    }
    return {
        services, 
        isFetching: !services,
        getServices
    }
}
