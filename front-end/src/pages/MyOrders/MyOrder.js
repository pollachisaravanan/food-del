import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import axios from "axios";
import './MyOrder.css'

const MyOrder = () => {

    const {url,token} = useContext(StoreContext)
    const[data,setData] = useState([]);

    const fetchOrders = async () =>{
        let response = await axios.post(`${url}/api/food/retrieve/getOrderDetails`,{url,token},{ 
            headers: { 
              token:token
            }
        })
        if(response.data.messType == 'S'){
            setData(response.data.data)
        }
        else{
            setData([])
        }
    }

    useEffect(() =>{
        if(token){
            fetchOrders();
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="continer">
            {data.map((order,index) =>(
                <div key = {index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt=""/>
                    <p>{order.items.map((inner_item,index) =>{  
                        if(index == order.items.length - 1){
                            return inner_item.name+" x "+inner_item.quantity
                        }
                        else{
                            return inner_item.name+ " x "+inner_item.quantity+" ,"
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items : {order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders}> Track Order</button>
                </div>
            ))}
        </div>      
    </div>
  )
}

export default MyOrder
