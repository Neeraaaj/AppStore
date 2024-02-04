import React, { useEffect, useState } from 'react'
import { InputContainer } from '../../components'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { saveAppsDataToCloud } from '../../api/getAuthenticatedUser'
import toast from 'react-hot-toast'
import { serverTimestamp } from 'firebase/firestore'
import useApps from '../../hooks/apps/useApps'

const NewApp = () => {
    const [title, setTitle] = useState("")
    const [company, setCompany] = useState("")
    const [appIcon, setAppIcon] = useState("")
    const [review, setReview] = useState("")
    const [totalReviews, setTotalReviews] = useState("")
    const [downloads, setDownloads] = useState("")
    const [cover, setCover] = useState("")
    const [banners, setBanners] = useState([])
    const [shortDescription, setShortDescription] = useState("")

    const {refetch: refetchAllApps} = useApps();
    const bannerHandleChange = (id, value) => {
        const updated = banners.map(item => item.id === id ? {...item, 
        uri: value} : item)
        setBanners(updated)
    }

    const handleAddInput = () => {
        
        const newInput = {
            id: banners.length + 1,
            uri: ""
        }

        setBanners(prevState => [...prevState, newInput]);
    }

    const handleRemoveInput = (id) => {
        const updatedBanners = banners.filter(item => item.id !== id)
        setBanners(updatedBanners);
    }

    const saveTheDoc = async () => {
        const id = `${Date.now()}`
        const timestamp = serverTimestamp();
        const _doc = {
            _id: id,
            title,
            company,
            appIcon,
            review,
            totalReviews,
            downloads,
            cover,
            banners,
            shortDescription,
            timestamp
        };
        await saveAppsDataToCloud(_doc).then(data => {
            clearAllFields();
            toast.success('Data saved in the cloud')
            console.log(data);
            refetchAllApps();
        })
    }


    const clearAllFields = () => {
        setAppIcon("")
        setCompany("")
        setCover("")
        setDownloads("")
        setReview("")
        setShortDescription("")
        setTitle("")
        setTotalReviews("")
        setBanners([])
    }

    const handleOnChange = (e) => {

    }
  return (
    <div className='w-full flex flex-col items-center justify-start px-2 py-3 gap-2'>
        <InputContainer placeholder="App title" onChangeText={(data) => setTitle(data) } stateValue={title}/>

            <div className='w-full flex flex-col items-center justify-start p-2 border border-gray-400 border-dashed rounded-md gap-4'>
                {banners.map((input, index) => {
                    return(
                        <div className='w-full flex items-center justify-center gap-2' key={input.id}>
                            <input 
                            className='w-full h-12 rounded-md outline-none border border-third bg-secondary
                            px-4 font-semibold font-sans'
                            type='text' 
                            placeholder={"Banner image url"}
                            value={input.uri}
                            onChange={(e) => bannerHandleChange(input.id, e.target.value)}
                            />
                            <div className='w-10 h-10 rounded-md flex items-center justify-center bg-red-400'>
                                <FaMinus className='text-textPrimary cursor-pointer' 
                                    onClick={() => handleRemoveInput(input.id)}
                                />
                            </div>
                        </div>
                    )
                })}

                <div className='w-full flex items-center justify-center cursor-pointer' onClick={handleAddInput}>
                    <FaPlus />
                </div>
            </div>

        <InputContainer placeholder="Company name"
        onChangeText={(data) => setCompany(data)} 
        stateValue={company}
        />

        <InputContainer placeholder="App icon url"
        onChangeText={(data) => setAppIcon(data)} 
            stateValue={appIcon}
        />

        <InputContainer placeholder="App review"
        onChangeText={(data) => setReview(data)}
        stateValue={review} />

        <InputContainer placeholder="Total reviews"
        onChangeText={(data) => setTotalReviews(data)} 
            stateValue={totalReviews}
        />

        <InputContainer placeholder="Total Downloads"
        onChangeText={(data) => setDownloads(data)}
                stateValue={downloads}
         />

        <InputContainer placeholder="Cover image url"
        onChangeText={(data) => setCover(data)} 
            stateValue={cover}
        />

        <textarea 
            name=''
            id=''
            cols="0"
            rows="10"
            className='w-full h-22 rounded-md outline-none border border-third dhadow-md bg-secondary px-4 text-lg font-semibold font-sans'
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder='Description here...'
        />

        <div className='w-full flex items-center justify-end gap-20'>
            <button type='button' className='border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondary hover:text-black transition-all ease-in-out duration-100 active:scael-95 cursor-pointer' 
                onClick={saveTheDoc}
            >Add</button>
            <button type='button' className='border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondary hover:text-black transition-all ease-in-out duration-100 active:scael-95 cursor-pointer'
            onClick={clearAllFields}>Close</button>
        </div>
    </div>
  )
}

export default NewApp