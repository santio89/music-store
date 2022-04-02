/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import '../../src/styles/css/NavBar.css';
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import LogInButton from "./LogInButton";

/* burger nav mobile toggle //bulma framework*/
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

        });
    });
    }

});
/* fin burger nav */

export default function NavBar({brand}){

    const NavLogo = ()=>{
        return(
            <a className="navbar-item nav__logo" href="index.html">
                    {brand}
            </a>
        )
    }

    const NavBurger = ()=>{
        return(
            <a role="button" className="navbar-burger is-large" aria-label="menu" aria-expanded="false" data-target="navbarMain" tabIndex="0">
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
            <div id="navbarMain" className="navbar-menu">
            <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                <HomeButton />

                <SearchBar />

                <CartWidget/>
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