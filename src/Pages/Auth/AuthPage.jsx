import './AuthPage.css'
import { Register } from "../../components/Register.jsx"
import { Login } from '../../components/Login/Login.jsx'
import { useState } from 'react'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const handleAuthPage = ()=>{
    setIsLogin((prev)=> !prev)
  }
  return (
    <div className='auth-container'>
      {
        isLogin ? (
          <Login switchAuthHandler={handleAuthPage}/>
        ) : (
          <Register switchAuthAndler={handleAuthPage}/>
        )
      }
    </div>
  )
}
