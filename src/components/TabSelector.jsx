/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import '../../src/styles/css/TabSelector.css';

export default function TabSelector(){
    const [vistosActive, setVistosActive] = useState(true);
    const [categoriesActive, setCategoriesActive] = useState(false);

    const {item, categories} = useParams();
    

    const vistosClick = ()=>{
        setVistosActive(true);
        setCategoriesActive(false);
    }

    const categoriesClick = ()=>{
        setVistosActive(false);
        setCategoriesActive(true);
    }

/* VER    useEffect(()=>{
        if (item){
            setVistosActive(false);
            setCategoriesActive(false)
        } else if (categories){
            setVistosActive(false);
            setCategoriesActive(true);
        }
    }, [item, categories]); */
    

    return(
        <div className="tabs is-medium">
            <ul className="is-size-5">
                <li className={vistosActive?"is-active":""}><Link to="/" onClick={vistosClick} >Más Vistos</Link></li>
                <li className={categoriesActive?"is-active":""}><Link to="/categories" onClick={categoriesClick}>Categorías</Link></li>
            </ul>
        </div>
    )
}