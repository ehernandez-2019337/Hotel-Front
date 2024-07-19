import { useState } from "react";
import { saveServiceRequest } from "../../../services/api";
import toast from "react-hot-toast";

export const useSaveService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const save = async (type, hotel, price, description) => {
        setIsLoading(true);
        const service = {
            type, hotel, price, description
        };
        const response = await saveServiceRequest(service);
        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message ||
                'Error guardando el servicio'
            );
        }
        toast.success('El servicio se guardado correctamente');
    };

    return {
        save,
        isLoading
    };

}