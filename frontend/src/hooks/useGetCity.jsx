import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData,setCurrentAddress,setCurrentCity,setCurrentState } from "../redux/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";

function useGetCity() {
      const dispatch = useDispatch()
      const {userData} = useSelector(state=>state.user)
      const apikey = import.meta.env.VITE_GEOAPIKEY
      useEffect(() => {
        navigator.geolocation.getCurrentPosition(async(position)=>{
          console.log(position)
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
          // console.log(result.data.result[0].city)
          console.log(result?.data?.results[0].county)
          // dispatch()
          const city = result?.data?.results[0].county;
          dispatch(setCurrentCity(city))
          const state = result?.data?.results[0].state;
          console.log(result)
          dispatch(setCurrentState(state))
          const address = result?.data?.results[0].address_line1 || result?.data?.results[0].address_line2 ;
          dispatch(setCurrentAddress(address))
        })
    }, []);
}

export default useGetCity;