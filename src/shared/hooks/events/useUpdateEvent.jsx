import { updateEventRequest } from '../../../services/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const useUpdateEvent = () => {
    const [updatedEvent, setUpdatedEvent] = useState(null)

    const updateEvent = async (id, event) => {
        const response = await updateEventRequest(id, event)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar al evento'
            )
        } else {
            setUpdatedEvent(response.data);
            toast.success('Evento actualizado correctamente')
        }
    }

    return {
        updatedEvent,
        isFetching: !updateEvent,
        updateEvent
    }
}