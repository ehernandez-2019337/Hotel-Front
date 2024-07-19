import toast from 'react-hot-toast';
import { useState } from 'react';
import { getReservationRequest } from '../../../services/api';

export const useGetReservation = () => {
    const [ reservation, setReservation ] = useState(null)

    const getReservation = async() => {
        const response = await getReservationRequest()
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.messagge || 
                'Error al obtener las habitaciones'
            )
        }
        setReservation(response.data)
    }
    return {
        reservation, 
        isFetching: !reservation,
        getReservation
    }
}
