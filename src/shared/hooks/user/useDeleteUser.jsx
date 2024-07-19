import toast from "react-hot-toast";
import { deleteUserRequest } from "../../../services/api";

export const useDeleteUser = () => {
    const deleteUser = async(id)=>{
        const response = await deleteUserRequest(id)
        if(response.error){
            return toast.error( 'Error al eliminar el usuario')
        }
        return toast.success('Usuario eliminado')
    }

  return {
    deleteUser
  }
}
