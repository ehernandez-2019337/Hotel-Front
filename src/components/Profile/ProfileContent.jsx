import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useGetUser } from '../../shared/hooks/user/useGetUser';
import { PacmanLoader } from 'react-spinners'
import { ProfileView } from './ProfileView';


export const ProfileContent = () => {
    const { users, getUsers, isFetching: isFecthingUser } = useGetUser()
  
    useEffect(() =>{
        getUsers()
    }, [])
  
    console.log(users)
    if(isFecthingUser ){
      return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <PacmanLoader color="#ffe733"/>
          </div>
      )
    }
    return (
      <div>
        <Routes>
          <Route path="profileView" element = {<ProfileView users={users} getUsers={getUsers}/>} />
        </Routes>
      </div>
    )
};