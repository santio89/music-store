/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../src/styles/css/NavBar.css';
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import LogInButton from "./LogInButton";


export default function NavBar({brand}){
    const [navOpen, setNavOpen] = useState(false); 

    const navToggle = (navOpen)=>{
        setNavOpen(navOpen=>!navOpen)
    }
    const navClosed = ()=>{
        setNavOpen(false)
    }


    return(
        <>
            <nav className="navbar is-fixed-top is-danger has-shadow is-spaced nav" id="nav" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                 <Link to="/" className="navbar-item nav__logo" onClick={()=>window.scrollTo(0,0)}>
                    {brand}
                </Link>
                <button className={`navbar-burger is-large ${navOpen?"is-active":""}`} aria-label="menu" onClick={()=>navToggle()}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>
                <div className={`navbar-menu ${navOpen?"is-active":""}`}>
                    <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                    <Link to="/" className="navbar-item nav__home" role="button" onClick={()=>{window.scrollTo(0,0); navClosed()}}>
                        Inicio
                    </Link>

                        <SearchBar navClosed={navClosed}/>

                        <CartWidget navClosed={navClosed}/>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <LogInButton />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}