import React from "react";
import '../../src/styles/NavBar.css';

/* burger nav toggle //bulma framework*/
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

export default function NavBar(){
    return(
        <>
        
        <nav className="navbar is-fixed-top is-danger has-shadow is-spaced nav" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item is-size-2 nav__logo" href="index.html">
                    MusicStore
                </a>

                <a role="button" className="navbar-burger is-large" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end is-size-4-widescreen is-size-5-desktop is-size-4-touch">
                    <a className="navbar-item">
                        Inicio
                    </a>

                    <a className="navbar-item searchBar__wrapper">
                        <div className="searchBar">
                            <input type="search" placeholder="Buscar" className="searchBar__input"></input>
                            <i class="bi bi-search searchBar__icon"></i>
                        </div>
                    </a>

                    <a className="navbar-item">
                        <i class="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-dark is-size-5-widescreen is-size-6-desktop is-size-5-touch">
                                <strong>Crear Cuenta</strong>
                            </a>
                            <a className="button is-light is-size-5-widescreen is-size-6-desktop is-size-5-touch">
                                Entrar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        </>
    )
}