import React, { useState } from 'react'
import Navbar from './components/Navbar/navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import PlaceOrder from './pages/Place Order/place-order'
import Verify from './pages/Verify/verify'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MyOrder from './pages/MyOrders/MyOrder'

// Function Declaration Starts
const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {
      showLogin ? <LoginPopUp setShowLogin = {setShowLogin}/> : <></>
    }
    <div>
      <ToastContainer/>
      <div className='food-del-nav-bar'>
      <Navbar setShowLogin = {setShowLogin}/>
      <Routes>
        <Route path ='/' element ={<Home/>}/>
        <Route path ='/cart' element ={<Cart/>}/>
        <Route path ='/order' element ={<PlaceOrder/>}/>
        <Route path ='/verify' element ={<Verify/>}/>
        <Route path ='/verify' element ={<Verify/>}/>
        <Route path ='/myorders' element ={<MyOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default App
