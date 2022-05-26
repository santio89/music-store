/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../src/styles/css/NavBar.css';
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";
import LogInButton from "./LogInButton";
import Marquee from "./Marquee";


export default function NavBar({ brand }) {
    const [navOpen, setNavOpen] = useState(false);

    const navToggle = () => {
        setNavOpen(navOpen => !navOpen)
    }

    const navClosed = () => {
        if (navOpen) {
            setNavOpen(false)
        }
    }

    return (
        <>
            <nav className="navbar is-fixed-top is-danger has-shadow is-spaced nav" id="nav" role="navigation" aria-label="main navigation">
                <Marquee />
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item nav__logo" onClick={() => window.scrollTo(0, 0)}>
                        {brand}
                    </Link>
                    <button className={`navbar-burger is-large ${navOpen ? "is-active" : ""}`} aria-label="menu" onClick={() => navToggle()}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className={`navbar-menu ${navOpen ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item nav__home" role="button" onClick={() => { navClosed(); window.scrollTo(0, 0) }}>
                            Inicio
                        </Link>

                        <SearchBar navClosed={navClosed} />

                        <CartWidget navClosed={navClosed} navOpen={navOpen} />
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item navbar-buttons">
                            <div className="buttons">
                                <ThemeButton navClosed={navClosed} />
                                <LogInButton navClosed={navClosed} />
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}