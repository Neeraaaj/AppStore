import React from 'react'
import useUsers from '../../hooks/users/useUsers'
import { MainLoader } from '../../components';
import UserListCard from '../../components/admin/UserListCard';

const AdminUsers = () => {
  const {data: users, isLoading, isError, refetch} = useUsers();

  if(isLoading){
    return <MainLoader />
  }

  return (
    <div className=''>
      {users && users?.length > 0 ? (
        <React.Fragment>
          {users?.map(user => {
            return(
              <UserListCard key={user?.uid} user={user}/>
            )
          })}
        </React.Fragment>
      ): (
        <React.Fragment>

        </React.Fragment>
      )}
    </div>
  )
}

export default AdminUsers