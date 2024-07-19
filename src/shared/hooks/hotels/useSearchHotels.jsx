import toast from "react-hot-toast";
import { searchHotelRequest } from "../../../services/api";
import { useState } from "react";

export const useSearchHotels = () => {
    const [searchedHotels, setSearchedHotels] = useState(null);

    const searchHotels = async (searchQuery) => {
        try {
            const response = await searchHotelRequest(searchQuery);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                        "Error al buscar hoteles"
                );
            } else {
                setSearchedHotels(response.data.hotels);
            }
        } catch (error) {
            console.error("Error al buscar hoteles:", error)
            toast.error("Error al buscar hoteles")
        }
    };

    return {
        searchedHotels,
        isSearching: !searchedHotels,
        searchHotels,
    };
};
