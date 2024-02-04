import React from 'react'
import useApps from '../../hooks/apps/useApps'
import { AppsListCard, MainLoader } from '../../components';
import { PacmanLoader } from 'react-spinners';

const ListOfApps = () => {
  const {data: apps, isLoading, isError, refetch} = useApps();

  if(isLoading){
    return <PacmanLoader color='#FF9E01' size={40}/>
  }

  return (
    <div className='grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-start'>
      {apps?.length > 0 && apps ? (
      <React.Fragment>
        {apps?.map(app => {
          return(
            <AppsListCard key={app?._id} data={app} />
          )
        })}
      </React.Fragment>
      ):(
        <React.Fragment>
          <p className='text-white'>No Data</p>
        </React.Fragment>
      ) }
    </div>
  )
}

export default ListOfApps