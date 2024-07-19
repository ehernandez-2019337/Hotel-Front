import { useState } from "react";
import toast from "react-hot-toast";
import { updateServiceRequest } from "../../../services/api";

export const useUpdateService = () => {
    const [updatedService, setUpdatedService] = useState(null)

    const updateService = async (id, service) => {
        const response = await updateServiceRequest(id, service)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar el servicio'
            )
        } else {
            setUpdatedService(response.data);
            toast.success('Actualizado correctamente')
        }
    }

    return {
        updatedService,
        isFetching: !updateService,
        updateService
    }
}