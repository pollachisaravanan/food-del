import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
const LoginPopUp = ({setShowLogin}) => {

    const [currentState,setCurrentState] = useState("Login")

    const {url,setToken} = useContext(StoreContext)

    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setData(data =>({...data,[name]:value}))
    }

    const onLogin  = async(event) =>{
      event.preventDefault();
      let newUrl = url
      if(currentState == "Login"){
        newUrl += `/api/food/retrieve/loginUser`
      }
      else{
        newUrl += `/api/food/create/register`
      }

      const response = await axios.post(newUrl,data)

      if(response.data.messType == 'S'){
        setToken(response.data.data)
        localStorage.setItem("token",response.data.data)
        setShowLogin(false)
      }
      else{
        alert(response.data.messText)
      }

    }
  return (
    <div className='login-popup'>
      <form onSubmit = {onLogin} className= "login-popup-container" action="">
        <div class="login-popup-title">
            <h2>{currentState}</h2>
        <img src={assets.cross_icon} onClick={() =>setShowLogin(false)} alt=""/>
        </div>
        <div class="login-popup-inputs">
            {currentState === "Login" ? <></> : <input name="name"  onChange = {onChangeHandler} value = {data.name} type="text" placeholder='Your Name' required/>}
            <input name="email"  onChange = {onChangeHandler} value = {data.email} type="text" placeholder='Your email' required/>
            <input name="password"  onChange = {onChangeHandler} value = {data.password} type="text" placeholder='Your Password' required/>   
        </div>
        <button type="submit" >{currentState === "Sign Up" ? "Create Account" :"Login"}</button>
        <div class="login-popup-condition">
            <input type="checkbox" required/>
            <p>By Continuing, I agree terms and conditions</p>
        </div>
        {currentState === 'Sign Up' ? <p>Already have an Account <span onClick={() =>setCurrentState("Login")}>Login here</span ></p> : <p>Create an account? <span onClick={() =>setCurrentState("Sign Up")}>Click here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp
