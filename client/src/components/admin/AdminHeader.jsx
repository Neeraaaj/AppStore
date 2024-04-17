import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo2.avif'
import useUser from '../../hooks/users/useUser'
import { useQueryClient } from 'react-query'
import UserProfileContainer from '../UserProfileContainer'
import LeftContainer from '../../containers/LeftContainer'

const AdminHeader = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-full flex items-center justify-between'>

          <Link to={"/"}>
              <img src={Logo} className='w-16 h-auto object-contain rounded-full'/>
          </Link>

          <UserProfileContainer />
      </div>
    </div>
  )
}

export default AdminHeader
