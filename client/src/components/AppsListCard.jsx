import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import useUser from '../hooks/users/useUser'
import { AnimatePresence, motion} from 'framer-motion';
import { deleteAppFromCloud } from '../api/getAuthenticatedUser';
import toast from 'react-hot-toast';
import useApps from '../hooks/apps/useApps';

const AppsListCard = ({data}) => {
    const {data: user, isLoading, isError, refetch} = useUser();
    const {data: apps, refetch: refetchAllApps} = useApps();
    const [isDeleted, setIsDeleted] = useState(false);

    const removeApp = async() => {
        await deleteAppFromCloud(data?._id).then(() => {
            toast.success("Deleted App from the store");
            refetchAllApps();
            setTimeout(() => {
                setIsDeleted(!isDeleted);
            }, 1000);
        })
    }

  return (
    <div className='border-2 border-heroPrimary rounded-md px-3 py-2 flex items-end gap-3 relative mt-5'>
        <img src={data?.appIcon} className='object-cover rounded-md ' />
        <div>
            <h2 className='text-textPrimary font-semibold text-sm lg:text-md'>{data?.title}</h2>
            <span className='block items-start font-normal text-base'>{data?.company}</span>
        </div>

        {user?.role === 'admin' && (
            <div className='w-6 h-6 rounded-md absolute bg-red-500 bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                <FaTrash className='text-md text-white flex items-center justify-center' onClick={() => setIsDeleted(!isDeleted)}/>
            </div>
        )}

        <AnimatePresence>
                {isDeleted && (
                        <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                         className='fixed inset-9 backdrop-blur-lg flex flex-col items-center justify-center z-10'>
                            <div className='border rounded-md border-heroPrimary p-4 flex flex-col items-center justify-center gap-4'>
                                <h2 className='text-1xl font-medium'>Are you sure, Do you want to Delete this App?</h2>
                            </div>
                            <div className='flex items-center gap-4 justify-center m-4'>
                                <button className='outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-teal-400 hover:border-none'
                                onClick={removeApp}>Yes</button>
                                <button className='outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-red-400 hover:border -none' onClick={() => setIsDeleted(!isDeleted)}>No</button>
                            </div>
                        </motion.div>
                    )
                }
        </AnimatePresence>
        
    </div>
  )
}

export default AppsListCard