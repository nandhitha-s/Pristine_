/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../../assets/assets";
import './navbar.css'
const navBar = ()=>{
    return(
        <div className="navbar">
            <img className="logo" src={assets.logo} alt=""/>
        <img className="profile" src={assets.profile_image} alt=""/>
        </div>
    )
}
export default navBar;