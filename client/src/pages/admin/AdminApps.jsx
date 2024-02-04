import React from 'react'
import { NewApp } from '../../containers'
import ListOfApps from '../../containers/admin/ListOfApps'

const AdminApps = () => {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2'>
        {/* left section */}
        <NewApp />
        {/* right section */}
        <ListOfApps />
    </div>
  )
}

export default AdminApps