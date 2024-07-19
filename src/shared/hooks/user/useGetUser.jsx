import toast from "react-hot-toast"
import { getUserRequest } from "../../../services/api"
import { useState } from "react"

export const useGetUser = () => {
    const [ users, setUsers ] = useState(null)

    const getUsers = async() => {
        const response = await getUserRequest()
        if(response.error){
          return toast.error(
            response?.err?.response?.data?.messagge || 
            'Error al obtener el usuario'
          )
        }
        setUsers(response.data)
      }
    return {
        users, 
        isFetching: !users,
        getUsers
    }
}

