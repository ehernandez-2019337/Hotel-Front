import { useState } from "react";
import toast from 'react-hot-toast'
import { registerRequest } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const register = async(name, surname, email, phone, username, password)=> {
        setIsLoading(true)
        const user = {
          name,
          surname,
          username,
          password,
          phone,
          email
        }
        const response = await registerRequest(user)
        setIsLoading(false)
        console.log(user)
    
        if(response.error){
          if(response?.err?.response?.data?.errors){
            let arr = response?.err?.response?.data?.errors
            for (const error of arr) {
              return toast.error(
                error.msg
              )
            }
          }
            return toast.error(
                response?.err?.response?.data?.msg ||
                response?.err?.data?.msg ||
                'Error general al intentar registrar el usuario. Intenta de nuevo.'
            )
        }
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userRole', response.data.token.role)
        navigate('/hotels/hotelView')
    }

  return {
    register, 
    isLoading
  }
}
