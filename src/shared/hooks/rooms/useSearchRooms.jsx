import toast from "react-hot-toast";
import { searchRoomRequest } from "../../../services/api";
import { useState } from "react";

export const useSearchRooms = () => {
    const [searchedRooms, setSearchedRooms] = useState(null);

    const searchRooms = async (id, searchQuery) => {
        try {
            const response = await searchRoomRequest(id, searchQuery);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                        "Error al buscar roomes"
                );
            } else {
                setSearchedRooms(response.data.rooms);
            }
        } catch (error) {
            console.error("Error al buscar roomes:", error)
            toast.error("Error al buscar roomes")
        }
    };

    return {
        searchedRooms,
        isSearching: !searchedRooms,
        searchRooms,
    };
};
