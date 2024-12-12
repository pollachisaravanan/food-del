import React, { useContext } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const AppDownload = () => {
    
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience downlaod App <br/>Food Delivery</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt=""/>
        <img src={assets.app_store} alt=""/>
      </div>
    </div>
  )
}

export default AppDownload
