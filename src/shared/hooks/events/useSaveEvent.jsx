import { useState } from 'react'
import { saveEventRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useSaveEvent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const save = async (type, hotel, price, image) => {
        setIsLoading(true)
        const event = {
            type, hotel, price, image
        }
        const response = await saveEventRequest(event);
        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message || 
                'Error guardando evento'
            );
        }
        toast.success('Evento guardado correctamente');
    }

    return {
        save, 
        isLoading
    }
}

