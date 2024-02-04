import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../hooks/users/useUser'
import { MdCurrencyRupee} from 'react-icons/md'
import Avatar from '../assets/images/avatar1.jpeg'
import {FaChevronDown} from 'react-icons/fa'
import { Menus, signOutTheUser} from '../utils/helpers'
import { useQueryClient } from 'react-query'
import { AnimatePresence, motion} from 'framer-motion'
import { dropDownMenu } from '../animation'
import { PacmanLoader } from 'react-spinners'


const UserProfileContainer = () => {
    const {data: user, isLoading: userLoading, isError, refetch} = useUser()
    const [isHovereed, setIsHovered] = useState(false);
    const queryClient = useQueryClient()

    let userImg;
    if(user?.picture){
        userImg = user?.picture
    }

    if(userLoading){
        return <PacmanLoader color='#FF9E01' size={40} />
    }

  return (
    <div className='flex items-center justify-center gap-4 cursor-pointer'>
            {/* name comtent */}
            <div className='flex flex-col items-start justify-center gap-1'>
                <h2 className='text-2xl font-extrabold text-white capitalize'>{user?.name}</h2>
                <div className='flex items-center justify-center gap-2'>
                    <div className='w-6 h-6 rounded-full flex items-center justify-center bg-secondary border border-gray-200'>
                        <MdCurrencyRupee className='text-sm text-heroSecondary'/>
                    </div>
                    {user?.walletBalance ? 
                    (<React.Fragment>
                        <p>{user?.walletBalance}</p>
                    </React.Fragment>) : (
                    <React.Fragment>
                        <p className='text-lg font-semibold text-heroPrimary'>{user?.role === 'admin' ? 100000 : 0}</p>
                    </React.Fragment>)}
                </div>
            </div>

            {/* image content */}
            <div className='w-14 h-14 rounded-full p-1 flex items-center justify-center relative  bg-gradient-to-b from-red-300 to bg-red-700' onMouseEnter={() => setIsHovered(true)}>
                <img src={user?.picture ? userImg : Avatar} alt='' className='w-full h-full object-cover rounded-full' />
                <div className='w-4 h-4 rounded-full bg-secondary absolute bottom-1 right-0 flex items-center justify-center border border-gray-600'>
                    <FaChevronDown className='text-[11px] text-textSecondary'/>
                </div>

            </div>
            
            {/* drop down section */}
            <AnimatePresence>
                {isHovereed  && (

                <motion.div 
                {...dropDownMenu}
                className='absolute top-[80px] right-0 bg-secondary shadow-md flex flex-col items-start justify-start w-64 px-3 py-2 gap-3 rounded-md z-50' onMouseLeave={() => setIsHovered(false)}>
                    {Menus && Menus.map((menu) => <React.Fragment>
                        {menu.isAdmin ? 
                        ( 
                            <Link 
                            to={menu.uri}
                            className='py-2 px-1 font-semibold hover:text-heroSecondary' 
                            key={menu.id}>{menu.menu}</Link>
                        ):(
                            <Link 
                            to={menu.uri}
                            className='py-2 px-1 font-semibold hover:text-heroSecondary' 
                            key={menu.id}>{menu.menu}</Link>
                        )}
                    </React.Fragment>)}
                    <button type='button' onClick={() => signOutTheUser(queryClient)} className='px-4 py-2 w-full rounded-md bg-textPrimary text-primary'>
                        Sign Out
                    </button>
                </motion.div>
                )
                }
            </AnimatePresence>
        </div>
  )
}

export default UserProfileContainer