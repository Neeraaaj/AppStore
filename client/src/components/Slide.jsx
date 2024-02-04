import { BiSolidCopyAlt } from "react-icons/bi";
import {
  MdLogout,
} from "react-icons/md";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const Slide = ({ image }) => {
    return (
      <div className="w-full h-full">
        <img src={image} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-transparent">
          <div className="w-full h-full flex flex-col items-start justify-start px-4 py-2 lg:px-8 lg:py-6  ">
            <h1
              className="text-xl lg:text-3xl font-bold text-white tracking-wide"
              style={{ textShadow: "5px 5px 8px rgba(0,0,0,0.6)" }}
            >
              We give money for the{" "}
              <span className="block">first registration!</span>
            </h1>
            <p className="mt-2 text-white">
              <span className="text-secondary">Free $100!</span> Register and
              enter a special code
            </p>
  
            <div className="mt-3 flex items-center justify-center gap-8">
              <div className="px-4 py-2 rounded-full border-2 border-dashed border-secondary bg-bgGlobal flex items-center justify-center gap-2">
                <BiSolidCopyAlt className="text-secondary" />
                <p className="text-sm font-bold text-white">#FREE5</p>
              </div>
  
              <div className="bg-gradient-to-r from-heroPrimary to-heroSecondory rounded-full px-4 py-2 shadow-lg flex items-center justify-center gap-2">
                <MdLogout className=" text-black" />
                <p className="text-sm font-medium text-black">SignUp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };