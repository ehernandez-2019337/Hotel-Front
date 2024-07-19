import { deleteCategoryRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useDeleteCategory = () => {
    const deleteCategory = async(id)=>{
        const response = await deleteCategoryRequest(id)
        if(response.error){
            return toast.error( 'Error al eliminar la categoria')
        }
        return toast.success('Category eliminada')
    }

  return {
    deleteCategory
  }
}

