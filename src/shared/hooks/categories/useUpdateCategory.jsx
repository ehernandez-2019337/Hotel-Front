import toast from 'react-hot-toast'
import { useState } from 'react'
import { updateCategoryRequest } from '../../../services/api'

export const useUpdateCategory = () => {
    const [updatedCategory, setUpdatedCategory] = useState(null)

    const updateCategory = async (id, category) => {
        const response = await updateCategoryRequest(id, category)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar la categoria'
            )
        } else {
            setUpdatedCategory(response.data);
            toast.success('categoria actualizada correctamente')
        }
    }

    return {
        updatedCategory,
        isFetching: !updateCategory,
        updateCategory
    }
}

