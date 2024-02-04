import React, { useState } from 'react'
import Rewards from '../assets/images/rewards.png'
import UserProfileContainer from './userProfileContainer'

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className='w-full flex items-center justify-between bg-slate-950 rounded-3xl  p-8 mt-20 '>
        <img src={"https://image.lexica.art/full_webp/92b03ca2-a4cd-4917-b810-3c754b3553ae"} className='w-[120px] hidden lg:block h-[87px] object-contain rounded-2xl' alt='' />

        <div className='flex items-center justify-center bg-white rounded-full shadow-xl px-4 py-3'>
            <input type='text' placeholder='Search For Apps..' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='bg-transparent outline-none border-none text-base font-medium text-textPrimary placeholder:text-third tracking-wider 2xl:w-96'/>
        </div>
        <UserProfileContainer />
    </div>
  )
}

export default Header