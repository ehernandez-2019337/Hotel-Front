import toast from "react-hot-toast";
import { searchServiceRequest } from "../../../services/api";
import { useState } from "react";

export const useSearchServices = () => {
    const [searchedServices, setSearchedServices] = useState(null);

    const searchServices = async (id, searchQuery) => {
        try {
            const response = await searchServiceRequest(id, searchQuery);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                        "Error al buscar Servicios"
                );
            } else {
                setSearchedServices(response.data.services);
            }
        } catch (error) {
            console.error("Error al buscar Servicios:", error)
            toast.error("Error al buscar Servicios")
        }
    };

    return {
        searchedServices,
        isSearching: !searchedServices,
        searchServices,
    };
};
