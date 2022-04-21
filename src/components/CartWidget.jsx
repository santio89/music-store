/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from 'react-router-dom'
import '../../src/styles/css/CartWidget.css';



export default function CartWidget({message, navClosed}){
    const {cartItems} = useContext(CartContext);
    
    return(
        <Link to="/checkout" onClick={()=>{window.scrollTo(0,0); navClosed()}} className={`CartWidget ${cartItems>0?"":"disabled"}`} role="button">
            {message?<span><i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>&nbsp;{message}</span>:<span><i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>&nbsp;{cartItems}</span>}
        </Link>
    )
}