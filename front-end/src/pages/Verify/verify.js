import React, { useContext, useEffect, useState } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const navigate = useNavigate()

    const VerifyPayment = async () =>{
        const response  = await axios.post(`${url}/api/food/update/updatePayment`,{success,orderId})
        if(response.data.messType == 'S'){
            navigate("/myorders")
          }
          else{
            navigate("/")
          }
    }

    const {url} = useContext(StoreContext)

    useEffect(() =>{
        VerifyPayment()
    },[])
  return (
    <div className='verify'>
        <div className="spinner">
        </div>
    </div>
  )
}

export default Verify
