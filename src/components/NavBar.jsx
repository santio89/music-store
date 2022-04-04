/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
    useEffect(()=>{
        /* TOGGLE NAV MOBILE - BULMA SNIPPET */
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
    
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
                console.log("test")
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
    
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
    
            });
        });
        }
    }, [cartNumber])

    const NavLogo = ()=>{
        return(
            <a className="navbar-item nav__logo" href="index.html">
                    {brand}
            </a>
        )
    }

    const NavBurger = ()=>{
        return(
            <a role="button" className="navbar-burger is-large" aria-label="menu" tabIndex="0" data-target="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
            </a>
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
                <a className="navbar-item nav__home" role="button" tabIndex="0">
                    Inicio
                </a>
            )
        }

        return(
            <div className="navbar-menu" id="navbar-menu">
                <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                    <HomeButton />

                    <SearchBar />

                    <CartWidget cartNumber={cartNumber}/>
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
        
        <nav className="navbar is-fixed-top is-danger has-shadow is-spaced nav" role="navigation" aria-label="main navigation">
            <NavBrand />
            <NavContent />
        </nav>

        </>
    )
}