import toast from 'react-hot-toast';
import { useState } from 'react';
import { getRoomsRequest } from '../../../services/api';

export const useGetRooms = () => {
    const [ rooms, setRooms ] = useState(null)

    const getRooms = async(id) => {
        const response = await getRoomsRequest(id)
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.messagge || 
                'Error al obtener las habitaciones'
            )
        }
        setRooms(response.data)
        
    }
    return {
        rooms, 
        isFetching: !rooms,
        getRooms
    }
}
