import React from 'react'
import Avatar from '../../assets/images/avatar1.jpeg'
import { updateUserDataToTheCloud } from '../../api/getAuthenticatedUser'
import toast from 'react-hot-toast'
import useUsers from '../../hooks/users/useUsers'

const UserListCard = ({user}) => {
    const {data: users, refetch: refetchAllUsers} = useUsers()

    const updateUserRole = async (role) => {
        await updateUserDataToTheCloud({_id: user?.uid, role: role})
        .then((data) => {
            toast.success("User Role Updated")
            refetchAllUsers();
        })
    } 
  return (
    <div class="flex flex-col m-5" data-aos="fade-up">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                        {user?.name}
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {user?.role}
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider max-w-40">
                        {user?.email}
                    </th>
                        <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                        {user?.role === 'admin' ? <button className='text-sm font-semibold px-2 py-1 bg-heroPrimary text-white rounded-2xl active:scale-95 transition-all duration-150 ease-in-out'
                onClick={() => updateUserRole("member")}>Mark as Member</button>
                : (
                    <button className='text-sm font-semibold px-2 py-1 bg-heroPrimary text-white rounded-2xl active:scale-95 transition-all duration-150 ease-in-out' onClick={() => updateUserRole("admin")}>Mark as Admin</button>
                )}
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
            
                </tbody>
                </table>
            </div>
            </div>
        </div>
</div>
  )
}

export default UserListCard