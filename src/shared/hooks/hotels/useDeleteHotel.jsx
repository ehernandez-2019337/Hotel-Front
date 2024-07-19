import toast from "react-hot-toast"
import { deleteHotelRequest } from "../../../services/api"


export const useDeleteHotel = () => {

    const deleteHotel = async(id)=>{
        const response = await deleteHotelRequest(id)
        if(response.error){
            return toast.error( 'Error al eliminar el hotel')
        }
        return toast.success('Hotel eliminado')
    }

  return {
    deleteHotel
  }
}
