import toast from 'react-hot-toast'
import React from 'react'

import { deleteEventRequest } from '../../../services/api'

export const useDeleteEvent = () => {
    const deleteEvent = async(id)=>{
        const response = await deleteEventRequest(id)
        if(response.error){
            return toast.error( 'Error al eliminar al evento')
        }
        return toast.success('Event eliminado')
    }

  return {
    deleteEvent
  }
}


