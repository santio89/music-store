/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import '../../src/styles/css/CardWidget.css';

export default function CartWidget({itemsNumber}){
    return(
        <a className="navbar-item CartWidget" role="button" tabIndex="0">
            <i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch">&nbsp;</i>
            <span>{itemsNumber}</span>
        </a>
    )
}