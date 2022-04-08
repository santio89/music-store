/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../../src/styles/css/TabSelector.css';

export default function TabSelector(){
    const [vistosActive, setVistosActive] = useState(true);
    const [categoriesActive, setCategoriesActive] = useState(false);

    const vistosClick = ()=>{
        setVistosActive(true);
        setCategoriesActive(false);
    }

    const categoriesClick = ()=>{
        setVistosActive(false);
        setCategoriesActive(true);
    }
    

    return(
        <div className="tabs is-medium">
            <ul className="is-size-5">
                <li className={vistosActive?"is-active":""}><Link to="/" onClick={vistosClick} >Más Vistos</Link></li>
                <li className={categoriesActive?"is-active":""}><Link to="/categories" onClick={categoriesClick}>Categorías</Link></li>
            </ul>
        </div>
    )
}