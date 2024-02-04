import React from 'react'
import { BiSolidCopyAlt } from "react-icons/bi";
import {
  MdConfirmationNumber,
  MdLogout,
  MdPoll,
  MdSportsBasketball,
  MdSportsFootball,
} from "react-icons/md";
import { FaAward } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import One from '../assets/images/2.jpg'
import Two from '../assets/images/3.png'
import Three from '../assets/images/4.jpg'
import Four from '../assets/images/5.jpg'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Slide } from './Slide';


const Banner = () => {
    return (
        <div className="w-full  rounded-[40px] h-64 xl:h-96 bg-fourth overflow-hidden relative shadow-lg shadow-[rgba(0,0,0,0.6)]">
          {/* slider */}
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Slide image={One} />
            </SwiperSlide>
            <SwiperSlide>
              <Slide image={Two} />
            </SwiperSlide>
            <SwiperSlide>
              <Slide image={Three} />
            </SwiperSlide>
            <SwiperSlide>
              <Slide image={Four} />
            </SwiperSlide>
          </Swiper>
          <div className="absolute inset-0 flex items-end justify-end z-50">
            <div className="w-full h-auto px-8 py-4 backdrop-blur-md bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.9)]  relative  flex items-center justify-start gap-6 flex-wrap">
              {/*  */}
              <div className="flex items-center justify-center gap-2 group">
                <div className="w-6 rounded-md h-6 bg-textSecondary  group-hover:bg-secondary flex items-center justify-center">
                  <MdConfirmationNumber className="text-heroPrimary " />
                </div>
                <p className="text-textSecondary text-sm group-hover:text-secondary">
                  Luck Numbers
                </p>
              </div>
    
              {/*  */}
              <div className="flex items-center justify-center gap-2 group">
                <div className="w-6 rounded-md h-6 bg-secondary  group-hover:bg-secondary flex items-center justify-center">
                  <MdSportsFootball className="text-heroPrimary " />
                </div>
                <p className="text-secondary text-sm group-hover:text-secondary">
                  Soccer
                </p>
              </div>
    
              {/*  */}
              <div className="flex items-center justify-center gap-2 group">
                <div className="w-6 rounded-md h-6 bg-textSecondary  group-hover:bg-secondary flex items-center justify-center">
                  <FaAward className="text-heroPrimary " />
                </div>
                <p className="text-textSecondary text-sm group-hover:text-secondary">
                  Jacpot
                </p>
              </div>
    
              {/*  */}
              <div className="flex items-center justify-center gap-2 group">
                <div className="w-6 rounded-md h-6 bg-textSecondary  group-hover:bg-secondary flex items-center justify-center">
                  <MdPoll className="text-heroPrimary " />
                </div>
                <p className="text-textSecondary text-sm group-hover:text-secondary">
                  Bet Games
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Banner