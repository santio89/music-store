import React from "react";
import '../../src/styles/NavBar.css';

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

                <a className="navbar-item">
                    Nuevos Lanzamientos
                </a>

                <a className="navbar-item">
                    <i class="bi bi-cart-fill is-size-3-widescreen is-size-4-desktop is-size-3-touch"></i>
                </a>

            {/* MENU DESPLEGABLE, POR EL MOMENTO NO LO USARE
                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                    More
                    </a>

                    <div className="navbar-dropdown">
                    <a className="navbar-item">
                        About
                    </a>
                    <a className="navbar-item">
                        Jobs
                    </a>
                    <a className="navbar-item">
                        Contact
                    </a>
                    <hr className="navbar-divider"/>
                    <a className="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div> */}
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