import React from 'react'
import { Outlet } from 'react-router-dom'
import useUser from '../hooks/users/useUser'
import useApps from '../hooks/apps/useApps';
import { MainLoader } from '../components';
import LeftContainer from '../containers/LeftContainer';
import RightContainer from '../containers/RightContainer';

const Layout = () => {
  const {data: user, isLoading: userLoading, isError: userError, refetch: userRefetch } = useUser();
  const {data: apps, isLoading: appsLoading, isError: appsError, refetch: appsRefetch} = useApps();

  if(userLoading || appsLoading){
    return <MainLoader />
  }
  return (
    <main className='w-screen h-screen min-h-screen flex-1 flex items-center justify-start'>
      <LeftContainer />

      <RightContainer />
    </main>
  )
}

export default Layout