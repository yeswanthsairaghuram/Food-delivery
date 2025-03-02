import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=''/>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium similique, quaerat consequuntur aliquid est, obcaecati corrupti, mollitia voluptate culpa vitae minus saepe ipsam sapiente consectetur ipsa minima sit ratione et.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>
                GET IN TOUCH
            </h2>
            <ul>
                <li>+91 9381249993 </li>
                <li>yeswanthsairaghuram07@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2025 ©yeswanth - All Right Reserved.</p>
    </div>
  )
}

export default Footer
