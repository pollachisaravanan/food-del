import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home")
    const {getTotalCartAmount,token,setToken}  = useContext(StoreContext)

    const navigate = useNavigate();

    const onLogOut = () =>{
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }

    const onOrders = () =>{
      navigate("/myorders")
    }
    
  return (
    <div className='navbar-component'>
       <Link to='/'><img src={assets.logo} className='logo' alt=""/></Link>
       <ul className='navbar-menu'>
        <Link to="/" onClick ={() => setMenu('home')} className={menu == 'home' ? 'active':''}>home</Link>
        <a href="#explore-menu" onClick ={() => setMenu('menu')} className={menu == 'menu' ? 'active':''}>menu</a>
        <a href="#app-download" onClick ={() => setMenu('mobile')} className={menu == 'mobile' ? 'active':''}>mobile</a>
        <a href="#footer" onClick ={() => setMenu('contact')} className={menu == 'contact' ? 'active':''}>contact us</a>
       </ul>
       <div className='navbar-right'>
        <img src={assets.search_icon}/>
        <div className='navbar-search-icon'>
            <Link to="/cart"><img src={assets.basket_icon}/></Link>
            <div className={getTotalCartAmount() === 0 ? "": "dot"}>
            </div>
        </div>
        {!token ? <button onClick={() =>setShowLogin(true)}>Sign in</button>:
        <div className='nav-bar-profile'>
          <img src={assets.profile_icon} alt=""/>
          <ul className='nav-profile-dropdown'>
            <li onClick={onOrders}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
            <li onClick={onLogOut}><img src={assets.logout_icon} alt=""/><p>LogOut</p></li>
          </ul>
          </div>}
       </div>
      
    </div>
  )
}

export default Navbar
