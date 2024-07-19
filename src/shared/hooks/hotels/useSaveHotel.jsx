import { useState } from "react";
import { saveHotelRequest } from "../../../services/api";
import toast from "react-hot-toast";

export const useSaveHotel = () => {
    const [isLoading, setIsLoading] = useState(false);

    const save = async (name, category, ubication, phone, email, image) => {
        setIsLoading(true);
        const hotel = {
            name, category, ubication, phone, email, image
        };
        const response = await saveHotelRequest(hotel);
        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message || 
                'Error guardando hotel'
            );
        }
        toast.success('Hotel guardado correctamente');
    };

    return {
        save, 
        isLoading
    };
};