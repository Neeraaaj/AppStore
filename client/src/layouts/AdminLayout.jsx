import React, {useEffect} from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AdminHeader, MainLoader } from '../components'
import useUser from '../hooks/users/useUser'
import { FaHome } from 'react-icons/fa'

const AdminLayout = () => {

  const {data: user, isLoading: userLoading, isError, refetch} = useUser()

  const navigate = useNavigate();

    useEffect(() => {
        if(!userLoading && (user?.role === 'member' || !user)){
            navigate("/", {replace: true});
        }
    }, [userLoading, user]);

    if(userLoading){
      return <MainLoader />
    }
  return (
    <div className='w-screen h-auto flex-col items-center justify-start px-4 py-3'>
        <AdminHeader />

        {/* navigation container */}
        <div className='w-full h-auto flex items-center gap-12 justify-center px-4 py-4'>
          <Link to={"/"}>
            <FaHome className='text-2xl hover:text-heroPrimary'/>
          </Link>

          <NavLink className={({isActive}) => `text-lg font-semibold ${isActive && "text-heroPrimary"}`}to={"/admin/home"}>Dashboard</NavLink>
          
          <NavLink className={({isActive}) => `text-lg font-semibold ${isActive && "text-heroPrimary"}`}to={"/admin/apps"}>Apps</NavLink>

          <NavLink className={({isActive}) => `text-lg font-semibold ${isActive && "text-heroPrimary"}`}to={"/admin/users"}>Users</NavLink>

        </div>
        <Outlet />
    </div>
  )
}

export default AdminLayout