/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'
import '../../src/styles/css/TabSelector.css';

export default function TabSelector(){
    const [vistosActive, setVistosActive] = useState(true);
    const [categoriesActive, setCategoriesActive] = useState(false);

    /* uso el hook useLocation para aplicar correctamente la clase is-active a las tabs */
    const url = useLocation().pathname;


    const vistosClick = ()=>{
        setVistosActive(true);
        setCategoriesActive(false);
    }

    const categoriesClick = ()=>{
        setVistosActive(false);
        setCategoriesActive(true);
    }

    const tabsOff = ()=>{
        setVistosActive(false);
        setCategoriesActive(false);
    }

    useEffect(()=>{
        if (url === "/"){
            setVistosActive(true);
            setCategoriesActive(false);
        } else if (url.startsWith("/categories")){
            setVistosActive(false);
            setCategoriesActive(true);
        } else if (url !== "/"){
            tabsOff();
        } 
    }, [url]);
    

    return(
        <div className="tabs is-medium">
            <ul className="is-size-5">
                <li className={vistosActive?"is-active":""}><Link to="/" onClick={vistosClick} >Más Vistos</Link></li>
                <li className={categoriesActive?"is-active":""}><Link to="/categories" onClick={categoriesClick}>Categorías</Link></li>
            </ul>
        </div>
    )
}