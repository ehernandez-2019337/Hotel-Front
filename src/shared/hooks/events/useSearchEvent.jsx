import toast from "react-hot-toast";
import { searchEventRequest } from "../../../services/api";
import { useState } from "react";

export const useSearchEvents = () => {
    const [searchedEvents, setSearchedEvents] = useState(null);

    const searchEvents = async (id, searchQuery) => {
        try {
            const response = await searchEventRequest(id, searchQuery);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                        "Error al buscar eventos"
                );
            } else {
                setSearchedEvents(response.events); 
            }
        } catch (error) {
            console.error("Error al buscar eventos:", error)
            toast.error("Error al buscar eventos")
        }
    };

    return {
        searchedEvents,
        isSearching: searchedEvents === null,
        searchEvents,
    };
};
