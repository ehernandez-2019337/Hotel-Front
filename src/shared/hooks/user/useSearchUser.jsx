import toast from "react-hot-toast";
import { searchUserRequest } from "../../../services/api";
import { useState } from "react";

export const useSearchUsers = () => {
    const [searchedUsers, setSearchedUsers] = useState(null);

    const searchUsers = async (searchQuery) => {
        try {
            const response = await searchUserRequest(searchQuery);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                        "Error al buscar usuarios"
                );
            } else {
                setSearchedUsers(response.user); 
            }
        } catch (error) {
            console.error("Error al buscar usuarios:", error)
            toast.error("Error al buscar usuarios")
        }
    };

    return {
        searchedUsers,
        isSearching: searchedUsers === null,
        searchUsers,
    };
};
