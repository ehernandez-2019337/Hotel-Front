import { useState } from "react";
import toast from "react-hot-toast";
import { updateRoomRequest } from "../../../services/api";


export const useUpdateRoom = () => {
    const [updatedRoom, setUpdatedRoom] = useState(null)

    const updateRoom = async (id, room) => {
        const response = await updateRoomRequest(id, room)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar la habitación'
            )
        } else {
            setUpdatedRoom(response.data);
            toast.success('Actualizada correctamente')
        }
    }

    return {
        updatedRoom,
        isFetching: !updateRoom,
        updateRoom
    }
}