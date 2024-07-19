import { Login } from "../../components/Login.jsx"
import { Navbar } from "../../components/navbar/Navbar.jsx"
import { UserProfile } from "../../components/Profile.jsx"
import { Welcome } from '../../components/Welcome.jsx'
import { useEffect } from "react"

export const Dashboard = () => {
  return (
    <div >
      <Login />
    </div>
  )
}
/*className="dashboard-container">
      <UserProfile userData={userData}/>*/