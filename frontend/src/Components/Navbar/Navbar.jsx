import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({ setShowLogin }) => {

  const [menu, Setmenu] = useState("Home")
  const navigate =useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const { getTotalCartAmount,token,setToken } = useContext(StoreContext)
  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt='' className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => Setmenu("Home")} className={menu === "Home" ? "active" : " "}>Home</Link>
        <a href='#explore-menu' onClick={() => Setmenu("Menu")} className={menu === "Menu" ? "active" : " "}>Menu</a>
        {/* <a href='' onClick={()=>Setmenu("Mobile-app")} className={menu==="Mobile-app"?"active":" "}>Mobile-app</a> */}
        <a href='#footer' onClick={() => Setmenu("Contact us")} className={menu === "Contact us" ? "active" : " "}>Contact us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Signin </button>
          :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img  src={assets.bag_icon}/><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img  src={assets.logout_icon}/><p>Logout</p></li>
            </ul>
            </div>
          }
      </div>
    </div>
  )
}

export default Navbar
