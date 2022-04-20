/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSpring, animated} from 'react-spring';
import { Link } from 'react-router-dom';
import '../../src/styles/css/NavBar.css';
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import LogInButton from "./LogInButton";


export default function NavBar({brand}){

    const [navOpen, setNavOpen] = useState(false); 



/*     const navTranslate = useSpring({
        top: navOpen?"100%":"-250%",
        pointerEvents: navOpen? "auto":"none",
    }) */
    
    const NavLogo = ()=>{
        return(
            <Link to="/" className="navbar-item nav__logo" onClick={()=>window.scrollTo(0,0)}>
                {brand}
            </Link>
        )
    }

    const NavBurger = ()=>{
        return(
            <button className={`navbar-burger is-large ${navOpen?"is-active":""}`} aria-label="menu" data-target="navbar-menu" onClick={()=>setNavOpen(!navOpen)}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        )
    }

    const NavBrand = ()=>{
        return(
            <div className="navbar-brand">
                <NavLogo />
                <NavBurger />
            </div>
        )
    }


    const NavContent = ()=>{
        const HomeButton = ()=>{
            return(
                <Link to="/" className="navbar-item nav__home" role="button" onClick={()=>window.scrollTo(0,0)}>
                    Inicio
                </Link>
            )
        }

        return(
            <animated.div className={`navbar-menu ${navOpen?"is-active":""}` }id="navbar-menu" /* style={navTranslate} */>
                <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                    <HomeButton />

                    <SearchBar />

                    <CartWidget />
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <LogInButton />
                        </div>
                    </div>
                </div>
            </animated.div>
        ) 
    }

    return(
        <>
            <nav className="navbar is-fixed-top is-danger has-shadow is-spaced nav" id="nav" role="navigation" aria-label="main navigation">
                <NavBrand />
                <NavContent />
            </nav>
        </>
    )
}