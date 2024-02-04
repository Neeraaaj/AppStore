import React, { useState } from 'react'
import { auth } from '../config/firebase.config'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import useApps from '../hooks/apps/useApps'
import { AnimatePresence, motion } from 'framer-motion'
import { MdStar } from 'react-icons/md'
import { FaHeart } from 'react-icons/fa6'

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const{
    data: apps,
    isLoading: appLoading,
    isError: appsError,
    refetch: appRefetch,
  } = useApps();
  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4'>
      {/* left  */}
      <div className='col-span-12 lg:col-span-8 overflow-y-scroll scrollbar-none'>
        <Banner />

        <div className='w-full grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 py-4 my-6'>
          {apps && apps?.length > 0 && apps.map(app =>(
            <React.Fragment>
              <div className='w-full duration-200 rounded-md overflow-hidden relative'
              onMouseEnter={() => setIsHovered(!isHovered)}
              onMouseLeave={() => setIsHovered(!isHovered)}
              >
                <img src={app?.cover} className=' object-contain duration-200'/>

                <AnimatePresence>
                  {isHovered && (
                  <Link to={`/detail/${app?._id}`}>
                    <motion.div
                    initial={{opacity: 0, x: 10}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -10}}
                    className='absolute inset-0 bg-[rgba(0,0,0,0.10)] flex flex-col justify-between px-2 py-4'
                    >
                      <div className='w-full flex items-center justify-start'>
                        <MdStar className='text-heroPrimary text-base'/>
                        <p className='text-[10px] text-white font-extrabold'>
                          {app?.totalReviews}
                        </p>
                      </div>
                      <div className='flex flex-end w-25'>
                        <FaHeart className='text-red-500 flex justify-self-end ml-[90%]'/>
                      </div>

                      <div className='w-full flex flex-col items-start justify-start mt-[-10px]'>
                        <p className='text-sm 2xl:text-sm text-white font-extrabold'>
                          {app?.title}
                        </p>
                        <p className='text-xs 2xl:text-base text-heroPrimary font-extrabold'>
                          {app?.company}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                  )}
                </AnimatePresence>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* right */}
      <div className='col-span-4 h-full hidden lg:block'>
      </div>
    </div>
  )
}

export default Home