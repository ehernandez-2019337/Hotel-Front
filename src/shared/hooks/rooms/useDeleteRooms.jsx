import toast from "react-hot-toast"
import { deleteRoomRequest } from "../../../services/api"


export const useDeleteRoom = () => {

    const deleteRoom = async(id)=>{
        const response = await deleteRoomRequest(id)
        if(response.error){
            return toast.error( 'Error al eliminar la habitación')
        }
        return toast.success('Habitación eliminada')
    }

  return {
    deleteRoom
  }
}
