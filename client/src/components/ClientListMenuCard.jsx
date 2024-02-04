import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import { FaChevronCircleDown} from 'react-icons/fa';

const ClientListMenuCard = ({menu, isClosed}) => {
    const [isSubMenu, setIsSubMenu] = useState(false);
  return (
        <React.Fragment>
            <li className={`group flex items-center gap-x-4 cursor-pointer p-2 px-3 bg-primary hover:bg-[#282828] hover:shadow-lg rounded-md w-full ${isSubMenu && "bg-[#282828]"} 
            ${menu.spacing ? "mt-12" : "mt-4"}`}
            onClick={() => setIsSubMenu(!isSubMenu)}>
                <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-black group-hover:bg-gradient-to-br group-hover:from-red-400 group-hover:to-red-700 ${isSubMenu && "bg-gradient-to-br from-red-300 to-red-700"}`}>
                    {
                        <menu.Icon className={`text-xl block float-left text-textPrimary hover:text-textSecondary ${isSubMenu && "text-textSecondary font-extrabold"}`} 
                        />
                    }
                </span>
                <span className={`text-textPrimary group-hover:text-textSecondary text-base font-medium flex-1 duration-200 ${isClosed && "hidden"} ${isSubMenu && "text-white font-extrabold "}`}>
                    {menu.title}
                </span>
                {menu.submenu && !isClosed && (
                    <FaChevronCircleDown className={`text-textPrimary duration-200 ${isSubMenu && "text-textSecondary rotate-180"}`} />
                )}
            </li>
            <AnimatePresence>
                {menu.submenu && isSubMenu && !isClosed && (
                    <motion.ul 
                    initial={{opacity: 0, animation: "ease-in-out", y: 10}}
                    animate={{opacity: 1, animation: "ease-in-out", animationDelay: "revert", y: 0}}
                    exit={{opacity: 0, animation: "ease-in-out", y:-10}}
                    className='bg-white mt-2 rounded-md'
                    >
                        {menu.subMenuItems.map((item, index) => {
                            return(
                            <li key={index}
                            className={`group flex items-center gap-x-4 cursor-pointer py-3 px-4 w-full`}>
                                <span>
                                    {
                                        <menu.Icon className="text-xl block float-left text-black group-hover:text-heroPrimary" />
                                    }
                                </span>
                                <span className={`text-black group-hover:text-heroSecondary text-base font-bold flex-1 duration-200 ${isClosed && "hidden"}`}>
                                    {item.title}
                                </span>
                            </li>
                            )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </React.Fragment>
  )
}

export default ClientListMenuCard