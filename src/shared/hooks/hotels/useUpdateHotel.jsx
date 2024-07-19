import { useState } from "react";
import toast from "react-hot-toast";
import { updateHotelRequest } from "../../../services/api";


export const useUpdateHotel = () => {
    const [updatedHotel, setUpdatedHotel] = useState(null)

    const updateHotel = async (id, hotel) => {
        const response = await updateHotelRequest(id, hotel)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar el hotel'
            )
        } else {
            setUpdatedHotel(response.data);
            toast.success('Actualizado correctamente')
        }
    }

    return {
        updatedHotel,
        isFetching: !updateHotel,
        updateHotel
    }
}