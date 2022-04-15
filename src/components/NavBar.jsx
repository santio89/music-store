/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { Link } from 'react-router-dom';
import '../../src/styles/css/NavBar.css';
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import LogInButton from "./LogInButton";


/* 
    MOBILE NAV CON STATE (transitions no funcionan)
    const useNav = ()=>{
    const [navOpen, setNavOpen] = useState(false);

    const open = ()=>{
        setNavOpen(true)
    };

    const close = ()=>{
        setNavOpen(false)
    };

    return {navOpen, open, close}
} */

export default function NavBar({brand, cartNumber}){
    let {x} = useContext(Context);

    useEffect(()=>{
        /* TOGGLE NAV MOBILE - BULMA SNIPPET */
        const navbarBurger = document.querySelector('.navbar-burger');

        const navToggleEvent = ()=>{
            const target = navbarBurger.dataset.target;
            const $target = document.getElementById(target);
    
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            navbarBurger.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        }
    
        navbarBurger.addEventListener('click', ()=>navToggleEvent());
        
    }, [cartNumber])

    
    const NavLogo = ()=>{
        return(
            <Link to="/" className="navbar-item nav__logo" onClick={()=>window.scrollTo(0,0)}>
                {brand}
            </Link>
        )
    }

    const NavBurger = ()=>{
        return(
            <button className="navbar-burger is-large" aria-label="menu" data-target="navbar-menu">
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
            <div className="navbar-menu" id="navbar-menu">
                <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                    <HomeButton />

                    <SearchBar />

                    <CartWidget cartNumber={cartNumber} />
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <LogInButton />
                        </div>
                    </div>
                </div>
            </div>
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