import React, { useEffect } from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import {assets} from '../../assets/assets'
const Orders = () => {

  const url = `http://localhost:5000`
  const [getAllData,setAllData] = useState([])

  const fetchAllOrders = async () =>{
    const response = await axios.get(url+"/api/food/retrieve/getallOrderDetails")
    if(response.data.messType == 'S'){
      setAllData(response.data.data)
    }
    else{
      toast.error('Error in Food Retrieval !')
    }
  }

  const statusHandler = async(event,orderId) =>{
    const response = await axios.post(url+"/api/food/update/updateStatus",{orderId:orderId,status:event.target.value})
    if(response.data.messType == 'S'){
      await fetchAllOrders();
    }
  }

  useEffect(() =>{
      fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {getAllData.map((items,index) =>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt=""/>
            <div className='order-items-item'>
              <div>
                <p className='order-item-food'>
                  {items.items.map((inner_item,inner_index) =>{
                    if(inner_index === items.items.length -1){
                      return inner_item.name + " x " +inner_item.quantity
                    }
                    else{
                      return inner_item.name + " x " +inner_item.quantity + ","
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {items.address.first_name + " " +items.address.last_name}
                </p>
              </div>
              <div className="order-item-address">
              <p>{items.address.street+ ","}</p>
              <p>{items.address.city+ ", "}</p>
              <p>{items.address.state+", "+items.address.country+", "+items.address.zipcode}</p>
              <p className="order-item-phone">
                {items.address.phone}
              </p>
              </div>
              <p>Items :{items.items.length}</p>
              <p>{items.amount}</p>
              <select onChange={(event) =>statusHandler(event,items._id)} value={items.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivered">Out For Delivered</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
