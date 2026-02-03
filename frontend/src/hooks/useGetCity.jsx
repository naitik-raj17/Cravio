import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
function useGetCity() {
    const dispatch = useDispatch()
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async(position)=>{
            console.log(position)
        })
    },[])

}

export default useGetCity 