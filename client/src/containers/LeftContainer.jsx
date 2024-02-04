import React, { useState } from 'react'
import { FaChevronCircleDown, FaChevronCircleRight } from 'react-icons/fa'
import Logo from '../assets/images/logo2.avif'
import Flag from '../assets/images/flag.png'
import { ClientMenus } from '../utils/helpers'
import ClientListMenuCard from '../components/ClientListMenuCard'

const LeftContainer = () => {
    const [isClosed, setIsClosed] = useState(true);
  return (
    <div className={`${isClosed ? "w-20 px-3" : "w-80"} py-3 relative bg-slate-950 border-rh-[100vh] duration-200 flex flex-col items-center justify-start p-2 rounded-r-2xl`}>
        {/* absolute action button */}

        <div className='absolute -right-7 px-1 py-3 bg-gradient-to-br from-red-400 to-red-700 rounded-2xl w-10 cursor-pointer group flex items-center justify-center' onClick={() => setIsClosed(!isClosed)}>
            <FaChevronCircleRight className={`text-white text-sm duration-200 ${!isClosed && "rotate-[540deg]"}`}/>
        </div>

        <div className={`w-full 
        bg-white rounded-xl duration-200 inline-flex items-center justify-between gap-2 p-2 ${!isClosed && "px-6"}`}>
            <div className='flex items-center'>
                <img src={Logo} className='w-12 min-w-[40px] object-contain h-auto block float-left mr-5'
                alt='Logo'
                />
                <p className={`font-mono text-black font-extrabold uppercase tracking-[5px] ${isClosed && "scale-0"} duration-200`}>
                Stellar <span className='text-red-600'> Store </span>
                </p>
            </div>

            <div className={`${isClosed && "scale-0"} duration-200 relative`}>
                <div className='flex items-center justify-center p-2 rounded-2xl'>
                    <img src={Flag} className='w-12 h-auto object-contain' alt='Lan'/>
                    <div className='absolute -bottom-1 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-secondary'>
                        <FaChevronCircleDown className='text-[10px] text-white' />
                    </div>
                </div>
            </div>
        </div>
        <ul className={`pt-2 w-full ${!isClosed && "px-4"}`}>
            {ClientMenus.map((menu, index) => {
                return(
                    <React.Fragment key={index}>
                        <ClientListMenuCard menu={menu} isClosed={isClosed}/>
                    </React.Fragment>
                )
            })}
        </ul>

    </div>
  )
}

export default LeftContainer