import React from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className='side-bar'>
        <div className="side-bar-options">
            <NavLink to= '/add' className="side-bar-option">
                <img src={assets.add_icon} alt=""/>
                <p>Add Item</p>
            </NavLink>
            <NavLink to= '/list' className="side-bar-option">
                <img src={assets.order_icon} alt=""/>
                <p>List Item</p>
            </NavLink>
            <NavLink to= '/order' className="side-bar-option">
                <img src={assets.order_icon} alt=""/>
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default SideBar
