/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import '../../src/styles/NavBar.css';


export default function NavBar({brand}){
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

    return(
        <>
        
        <nav className="navbar is-fixed-top is-danger has-shadow is-spaced nav" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item is-size-2 nav__logo" href="index.html">
                    {brand}
                </a>

                <a role="button" className="navbar-burger is-large" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                    <a className="navbar-item" role="button" tabindex="0">
                        Inicio
                    </a>

                    <div className="navbar-item searchBar__wrapper">
                        <div className="searchBar">
                            <input type="text" placeholder="Buscar" className="searchBar__input"></input>
                            <button className="searchBar__icon"><i className="bi bi-search"></i></button>
                        </div>
                    </div>

                    <a className="navbar-item" role="button" tabindex="0">
                        <i className="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-dark is-size-5-widescreen is-size-6-desktop is-size-5-touch nav__ingresar">
                                <strong>Ingresar</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        </>
    )
}