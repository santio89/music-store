/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import '../../src/styles/css/CardWidget.css';

export function useCart(cartInitial = 0){
    const [cartNumber, setCartNumber] = useState(cartInitial);

    const cartAdd = (ammount)=>{
        setCartNumber(cartNumber + ammount)
    }

    return {cartNumber, cartAdd}
}


export default function CartWidget(){
    const {cartNumber, cartAdd} = useCart(0);
    
    return(
        <a className="navbar-item CartWidget" role="button" tabIndex="0">
            <i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch">&nbsp;</i>
            <span>{cartNumber}</span>
        </a>
    )
}