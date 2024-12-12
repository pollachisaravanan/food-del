import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
   <div className="footer" id="footer">
    <div className="footer-content">
      <div className="footer-content-left">
        <img src={assets.logo} alt=""/>
        <p>Conact Us</p>
        <div class="footer-social-icons">
          <img src={assets.facebook_icon} alt=""/>
          <img src={assets.twitter_icon} alt=""/>
          <img src={assets.linkedin_icon} alt=""/>
        </div>
      </div>
      <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy </li>
        </ul>
      </div>
      <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
          <li>+91 9385589686</li>
          <li>msksaravana200@gmail.com</li>
        </ul>
      </div>
    </div>
    <hr/>
      <p className='footer-copy-right'>CopyRight @2024 All rights reserved</p>

   </div>
  )
}

export default Footer

