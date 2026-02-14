import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { ImCross } from "react-icons/im"
import {TbReceipt2} from "react-icons/tb";
import {FaPlus} from "react-icons/fa6";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowInfo(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      // If backend is down, still clear client state.
      console.log(error);
    } finally {
      dispatch(setUserData(null));
      setLoggingOut(false);
      navigate("/signin");
    }
  };

  const userInitial = userData?.fullName?.slice(0, 1)?.toUpperCase() || "U";

  return (
    <header className="w-full h-[80px] flex items-center justify-between gap-[14px] px-[20px] fixed top-0 left-0 z-[9999] bg-[#fff9f6]">
      {/* Mobile search drawer */}
      {showSearch && userData.role=="user" && 
        <div className="w-[90%] h-[70px] md:hidden bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] z-[9999]">
          <div className="flex items-center w-[36%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-300">
            <FaLocationDot size={22} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity|| "Detecting location..."}</div>
          </div>
          <div className="w-[64%] flex items-center gap-[10px] pr-[10px]">
            <IoIosSearch size={22} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      }

      {/* Left: Brand */}
      <button
        type="button"
        className="text-3xl font-bold text-[#ff4d2d] leading-none"
        onClick={() => navigate("/")}
      >
        Cravio
      </button>

      {/* Center: Desktop search */}
      {  userData.role=="user" &&
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-300">
          <FaLocationDot size={22} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{currentCity|| "Detecting location..."}</div>
        </div>
        <div className="w-[70%] flex items-center gap-[10px] pr-[10px]">
          <IoIosSearch size={22} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food..."
            className="px-[10px] text-gray-700 outline-0 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>}

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="md:hidden text-[#ff4d2d]"
          onClick={() => setShowSearch((prev) => !prev)}
          aria-label={showSearch ? "Close search" : "Open search"}
        >
          {showSearch ? <ImCross size={22} /> : <IoIosSearch size={24} />}
        </button>

        {/* {userData.role=="user"&& <div><button
          type="button"
          className="relative text-[#ff4d2d]"
          aria-label="Cart"
          onClick={() => console.log("Open cart")}      >
          <IoCart size={24} />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d] text-[14px]">
            0
          </span>
        </button></div>} */}
      

        {
          userData.role=="owner"? <>
          {myShopData && <>
          <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]" >
             <FaPlus size={20}/>
             <span>Add Food Item</span>
          </button>
          <button className="md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]" >
             <FaPlus size={20}/> 
          </button>    
          </>}
          

          <div className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
            <TbReceipt2 size={20}/>
            <span>My Orders</span>
            <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>
            </div> 
          <div className="md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
            <TbReceipt2 size={20}/>
            <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">0</span>
            </div>        
          </>:(<><button
          type="button"
          className="relative text-[#ff4d2d]"
          aria-label="Cart"
          onClick={() => console.log("Open cart")}      >
          <IoCart size={24} />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d] text-[14px]">
            0
          </span>
        </button>
              <button
          type="button"
          className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-sm font-medium text-[#ff4d2d]"
          onClick={() => console.log("My Orders")}
        >
          My Orders
        </button></> 
      )

        }

        {/* <button
          type="button"
          className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-sm font-medium text-[#ff4d2d]"
          onClick={() => console.log("My Orders")}
        >
          My Orders
        </button> */}

        <div className="relative">
          <button
            type="button"
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
            onClick={() => setShowInfo((prev) => !prev)}
            aria-label="Open profile menu"
          >
            {userInitial}
          </button>

          {showInfo && (
            <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[200px] bg-white shadow-2xl rounded-xl p-[16px] flex flex-col gap-[10px] z-[9999]">
              <div className="text-[16px] font-semibold truncate">
                {userData?.fullName || "User"}
              </div>
              <button
                type="button"
                className="md:hidden text-left text-[#ff4d2d] font-semibold cursor-pointer"
                onClick={() => console.log("My Orders")}
              >
                My Orders
              </button>
              <button
                type="button"
                className="text-left text-[#ff4d2d] font-semibold cursor-pointer disabled:opacity-60"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Log Out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;








// import React, { useState } from 'react' 
// import {FaLocationDot} from "react-icons/fa6";
//  import {IoIosSearch} from "react-icons/io"; 
//  import { IoCart } from "react-icons/io5"; 
//  import { useSelector } from 'react-redux'; 
//  import { ImCross } from "react-icons/im"; 
//  function Nav () { 
//     const {userData} = useSelector(state=>state.user) ;
//     const [showInfo,setShowInfo]=useState(false);
//     const [showSearch,setShowSearch]=useState(false) ;
//     return ( 
//         <div className='w-full h-[80px] flex items-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>
//              {showSearch && 
//                         (<div className='w-[90%] h-[70px] md:hidden bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%]'>
//                 <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'> 
//                     <FaLocationDot size={25} className='text-[#ff4d2d]'/> 
//                     <div className='w-[80%] truncate text-gray-600'>jhansi</div>
//                      </div>
//                       <div className='w-[80%] flex items-center gap-[10px]'>
//                          <IoIosSearch size={25} className='text-[#ff4d2d]'/> 
//                          <input type="text" placeholder='search delicious food...' className='px-[10px] text-gray-700 outline-0 w-full' /> 
//                          </div> </div>)} 
//                     <div className='flex-1 flex justify-center items-center gap-[30px]'>
//             <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Cravio</h1>
//                     <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex'> 
//                         <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
//                              <FaLocationDot size={25} className='text-[#ff4d2d]'/> 
//                              <div className='w-[80%] truncate text-gray-600'>jhansi</div>
//                          </div>
//                          <div className='w-[80%] flex items-center gap-[10px]'> <IoIosSearch size={25} className='text-[#ff4d2d]'/> 
//                                 <input type="text" placeholder='search delicious food...' className='px-[10px] text-gray-700 outline-0 w-full' /> 
//                          </div> 
//                     </div>
//                 </div>  
//                     <div className='flex items-center gap-4'> 
//                                     {showSearch?<ImCross size={25} className='text-[#ff4d2d] md:hidden' onClick={()=>setShowSearch(false)}/>
//                                     :<IoIosSearch size={25} className='text-[#ff4d2d] md:hidden' onClick={()=>setShowSearch(true)}/> }
//                         <div className='relative cursor-pointer'>
//                                          <IoCart size={25} className='text-[#ff4d2d]'/> 
//                                          <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>0</span> 
//                                          </div> <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-sm font-medium'> 
//                                          My Orders </button>
//                                           <div className=' w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={()=>setShowInfo(prev=>!prev)}> 
//                                             {userData?.fullName?.slice(0,1)||"U"} </div> 
//                                             {showInfo && <div className='fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]'>
//                                                  <div className='text-[17px] font-semibold'>{userData?.fullName}</div> <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'> My Orders</div> 
//                                                  <div className='text-[#ff4d2d] font-semibold cursor-pointer'>Log Out</div> </div>} </div> </div> ) } 
// export default Nav