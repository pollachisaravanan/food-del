import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import './place-order.css'
import axios from "axios";

const PlaceOrder = () => {
  const {getTotalCartAmount,cardItems,food_list,url,token} = useContext(StoreContext)

  const [data,setData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    state:"",
    city:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHamdler = (event) =>{

    const name = event.target.name
    const value =event.target.value

    setData(data =>({...data,[name]:value}))
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount ===0){
      navigate('/cart')
    }
  },[data])


  const PlaceOrder = async (event) =>{
    event.preventDefault();
    let orderItems = []
    food_list.map((items) =>{
      if(cardItems[items._id] >0){
        let itemInfo = items
        itemInfo['quantity'] = cardItems[items._id]
        orderItems.push(itemInfo  )
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }

    let response = await axios.post(`${url}/api/food/create/placeOrder`,orderData,{ 
        headers: { 
          token:token
        }
    })

    console.log(response)

    if(response.data.messType == 'S'){
      const {session_url} = response.data
      window.location.replace(response.data.data.url)
    }
    else{
      alert('Something Went Wrong !')
    }
  }



  return (
   <form onSubmit = {PlaceOrder} action="" className="place-order">
    <div className="place-order-left">
      <p className='title'>Delivery Information</p>
      <div className="multi-fields">
        <input type="text" name="first_name" onChange={onChangeHamdler} value = {data.first_name} placeholder='First Name'/>
        <input type="text" name="last_name" onChange={onChangeHamdler} value = {data.last_name} placeholder='Last Name'/>
      </div>
      <input type="email" name="email" onChange={onChangeHamdler} value = {data.email} placeholder='E-mail Address'/>
      <input type="text" name="street" onChange={onChangeHamdler} value = {data.street} placeholder='Street'/>
      <div className="multi-fields">
        <input type="text" name="city" onChange={onChangeHamdler} value = {data.city} placeholder='City'/>
        <input type="text" name="state" onChange={onChangeHamdler} value = {data.state} placeholder='State'/>
      </div>
      <div className="multi-fields">
        <input type="text" name="zipcode" onChange={onChangeHamdler} value = {data.zipcode} placeholder='Zip Code'/>
        <input type="text" name="country" onChange={onChangeHamdler} value = {data.country} placeholder='Country'/>
      </div>
      <input type="text" name="phone" onChange={onChangeHamdler} value = {data.phone} placeholder='Phone'/>
    </div>
    <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Sub Total</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Total</p>
            <p className="total-amount">${getTotalCartAmount() === 0 ? getTotalCartAmount() : getTotalCartAmount()+2}</p>
          </div>
        </div>
        <button type="submit">PROCEED TO CHECKOUT</button>
      </div>
      </div>
   </form>
  )
}

export default PlaceOrder
