import React, { useCallback, useEffect } from 'react'
import LoginBG from '../assets/images/bg.jpg'
import {FcGoogle} from 'react-icons/fc'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import useUser from '../hooks/users/useUser'
import { useNavigate } from 'react-router-dom'

const Authentication = () => {
    const googleProvider = new GoogleAuthProvider()

    const {data: user, isLoading, isError, refetch} = useUser();
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoading && user){
            console.log('pushing')
            navigate("/", {replace: true})
        }
    }, [isLoading, user])

    if(isLoading){
        return <div>Loading.....</div>
    }

     const handleLoginAction = async() => {
        try{
            const userCred = await signInWithRedirect(auth, googleProvider);
            if(userCred){
                console.log(userCred);
            }
        }catch(error){
            console.error("Error during login", error);
        }
    };
  return (
    <div style={{background: `url('https://sm.pcmag.com/pcmag_me/photo/default/ww-seed-ramadan23-static-1250x710_f26q.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
    className='w-screen h-screen flex items-center justify-center p-5'
    >
        <div className='w-full lg:w-96 px-4 py-6 rounded-md backdrop-blur-md flex justify-center items-center flex-col gap-8 bg-[rgba(255,255,255, 0.5)]'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-mono  text-black font-extrabold '>Welcome Back</h1>
                <p className='text-gray-800 font-mono font-bold text-lg '>Sign In to access your store.</p>
            </div>

            <div className='w-full px-4 py-3 rounded-3xl flex items-center justify-center border border-gray-100 cursor-pointer shadow-xl bg-white active:scale-95 transition-all duration-150 ease-in-out' onClick={handleLoginAction}>
                <FcGoogle className='text-2xl'/>
                <p className='text-2xl font-semibold text-black font-mono'>Sign In with Google</p>
            </div>
        </div>
    </div>
  )
}

export default Authentication