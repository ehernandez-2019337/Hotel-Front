import { useState } from "react";
import { saveRoomRequest } from "../../../services/api";
import toast from "react-hot-toast";

export const useSaveRoom = () => {
    const [isLoading, setIsLoading] = useState(false);

    const save = async (roomName, hotel, description, price, image) => {
        setIsLoading(true);
        const room = {
            roomName, description, price, hotel, image
        };
        const response = await saveRoomRequest(room);
        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message || 
                'Error guardando habitación'
            );
        }
        toast.success('Habitación guardada correctamente');
    };

    return {
        save, 
        isLoading
    };
};