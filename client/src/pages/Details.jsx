import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApps from '../hooks/apps/useApps';
import { MainLoader } from '../components';
import { MdArrowBack, MdArrowForward, MdBookmarkAdd, MdShare, MdStar } from 'react-icons/md';
import { FaComputer } from 'react-icons/fa6';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Details = () => {
    const { appid } = useParams();
    const { data: appData, isLoading: appLoading, isError: appError, refetch: appRefetch } = useApps();

    const [loadedApp, setLoadedApp] = useState(null);
    useEffect(() => {
        if(appid && appData?.length > 0 && appData){
            setLoadedApp(appData.filter(app => app?._id === appid)[0])
        }
    }, [appData])

    if(appLoading){
        return <MainLoader />;
    }
  return (
    <div className='overflow-y-scroll scrollbar-none h-full'>
    <AppBanner loadedApp={loadedApp} />

        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-8 py-4 ">
        <div className="col-span-12 lg:col-span-8  flex flex-col items-center justify-start gap-3">
            <div className="w-full  overflow-x-scroll scrollbar-none py-6">
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                grabCursor={true}
                className="mySwiper"
            >
                {loadedApp?.banners &&
                loadedApp?.banners?.map((img, index) => (
                    <SwiperSlide style={{ width: 500 }} key={index}>
                    <div className="duration-200 w-auto h-64 rounded  overflow-hidden relative">
                        <img
                        src={img?.uri}
                        className="w-auto h-full object-cover"
                        alt=""
                        />
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>

            {/* about this game */}
            <div className="w-full flex flex-col items-start justify-start gap-3 py-6">
            <div className="flex items-center justify-center gap-12">
                <p className="text-2xl text-gray-300">About this game</p>

                <MdArrowForward className="text-2xl text-gray-300" />
            </div>
            <p className="text-base text-gray-400">
                {loadedApp?.shortDescription}                
            </p>
            </div>
        </div>

        {/* Simillar card section */}
        <div className="col-span-4 h-full px-2 py-4 hidden lg:flex flex-col items-start justify-start gap-4">
            <div className="flex items-center justify-center gap-12">
            <p className="text-2xl text-gray-300">Simillar Apps</p>

            <MdArrowForward className="text-2xl text-gray-300" />
            </div>
            {appData && appData?.length > 0 && appData.filter((game) => game._id !== appid)
                .map((value, index) => (
                <div
                    className="w-full px-3 py-2 flex items-start justify-start gap-2"
                    key={index}
                >
                    <img
                    src={value?.appIcon}
                    className="w-12 h-12 rounded-md object-cover"
                    alt=""
                    />
                    <div className="flex flex-col items-start justify-start gap-2">
                    <p className="text-base font-extrabold text-white">
                        {value?.title}
                    </p>
                    <div className="flex items-center justify-start gap-1">
                        <p className="text-sm font-medium text-white">
                        {value?.review}
                        </p>
                        <MdStar className="text-yellow-400" />
                    </div>
                    </div>
                </div>
                ))}
        </div>
        </div>
    </div>
  )
}

export const AppBanner = ({ loadedApp }) => {
    const navigate = useNavigate();
    return (
      <div className="w-full h-[550px] bg-[#ffffff00] relative">
        <img
          src={loadedApp?.cover}
          className="w-full h-full object-cover rounded-b-3xl"
          alt=""
        />
  
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[rgba(0,0,0,0.9)] to-transparent flex flex-col items-start justify-between z-10 rounded-b-3xl">
          <div
            className="px-8 pt-8 hover:translate-x-3 duration-200 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdArrowBack className="text-3xl text-gray-200" />
          </div>
          <div className="w-full px-8 py-12 flex items-start justify-start flex-col gap-5">
            <h2 className="text-white text-4xl lg:text-6xl font-extrabold">
              {loadedApp?.title}
            </h2>
  
            <div className="flex flex-col items-start justify-start">
              <p className="text-white font-extrabold">{loadedApp?.company}</p>
              <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                Contains ads
                <span>
                  <div className="w-[1px] h-[1px] rounded-full bg-gray-400"></div>
                </span>
                In-app purchases
              </p>
            </div>
  
            <div className=" flex items-center justify-center gap-8">
              <img
                src={loadedApp?.appIcon}
                className="w-12 h-12 rounded-lg object-cover"
                alt=""
              />
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-base font-medium text-gray-200 flex  items-center justify-center">
                  {loadedApp?.reviews}
                  <MdStar className="text-gray-200 text-xs" />
                </p>
                <span className="text-[12px]  text-gray-400">
                  {loadedApp?.totalReviews} reviews
                </span>
              </div>
  
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-base font-medium text-gray-200">
                  {loadedApp?.downloads}
                </p>
                <span className="text-[12px]  text-gray-400">Downloads</span>
              </div>
  
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-sm font-medium text-black flex  items-center justify-center bg-gray-200">
                  {loadedApp?.rated}
                </p>
                <span className="text-[12px]  text-gray-400">
                  Rated for {loadedApp?.rated}
                </span>
              </div>
            </div>
  
            <div className="flex items-center justify-center gap-8">
              <button className="border-none outline-none bg-gradient-to-r from-heroPrimary bg-heroSecondory rounded-md px-12 py-2 font-medium">
                Install
              </button>
  
              <MdShare className="text-secondary text-2xl cursor-pointer" />
  
              <MdBookmarkAdd className="text-secondary text-2xl cursor-pointer" />
            </div>
  
            <div className="flex items-center justify-center flex-wrap gap-8">
              <div className="flex items-center justify-center gap-2">
                <FaComputer className="text-gray-400 text-sm" />
                <p className="text-gray-400 text-xs">
                  This app is not available for your device
                </p>
              </div>
  
              <div className="flex items-center justify-center gap-2">
                <img
                  src="https://lh3.googleusercontent.com/1d_Ubja0DGaHuhzY8zJga9oG7gS0xwPomKryvehUMEnT667MbNI_SIV2uf6C_BYcX17dlpioO28Qr-dq9ngIbUVcOpNxBrF_D9_yJ7mfDRFG5zbN7Q=s1000"
                  alt=""
                  className="w-4 h-auto object-contain"
                />
                <p className="text-gray-400 text-xs">
                  Get items in this app or game with Play Points. Learn more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Details