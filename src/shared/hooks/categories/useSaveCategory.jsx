import { useState } from 'react'
import { saveCategoryRequest } from '../../../services/api'
import toast from 'react-hot-toast'

export const useSaveCategory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const save = async (name, description) => {
        setIsLoading(true)
        const category = {
            name, description
        }
        const response = await saveCategoryRequest(category);
        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message || 
                'Error guardando categoria'
            );
        }
        toast.success('Categoria guardada correctamente');
    }

    return {
        save, 
        isLoading
    }
}

