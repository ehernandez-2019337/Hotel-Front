import { useState } from "react";
import toast from 'react-hot-toast'
import { loginRequest } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()  

    const login = async(user, password)=> {
        setIsLoading(true)
        const userN = {
          user,
          password
        }
        const response = await loginRequest(userN)
        setIsLoading(false)
    
        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error general al intentar logearse. Intenta de nuevo.'
            )
        }
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userRole', response.data.loggedUser.role)
        navigate('/hotels/hotelView')
    }

  return {
    login, 
    isLoading,
  }
}
