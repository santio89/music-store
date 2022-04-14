/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from 'react-router-dom'
import '../../src/styles/css/CardWidget.css';



export default function CartWidget({cartNumber, disabled}){
    
    return(
        <Link to="/checkout" onClick={()=>window.scrollTo(0,0)} className={`navbar-item CartWidget ${disabled?"checkoutDisabled":null}`} role="button">
            <i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch">&nbsp;</i>
            <span>{cartNumber}</span>
        </Link>
    )
}