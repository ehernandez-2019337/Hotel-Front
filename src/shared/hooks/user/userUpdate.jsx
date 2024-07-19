import { useState } from "react";
import toast from "react-hot-toast";
import { updateUserRequest } from "../../../services/api"

export const useUpdateUser = () => {
    const [updatedUser, setUpdatedUser] = useState(null)
    
    const updateUser = async (id, user) => {
        const response = await updateUserRequest(id, user)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar el user'
            )
        } else {
            setUpdatedUser(response.data)
            toast.success('Actualizado correctamente')
        }
    }

    return {
        updatedUser,
        isFetching: !updateUser,
        updateUser
    }
}