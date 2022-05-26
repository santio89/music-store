/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../src/styles/css/NavBar.css';
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";
import LogInButton from "./LogInButton";


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
                <div className="nav__marquee"><div className="nav__marquee__linkContainer"><Link to="/categories/rock" className='Categories__rock'>·&nbsp;ROCK&nbsp;</Link>
                    <Link to="/categories/pop" className='Categories__pop'>·&nbsp;POP&nbsp;</Link>
                    <Link to="/categories/blues" className='Categories__blues'>·&nbsp;BLUES&nbsp;</Link>
                    <Link to="/categories/jazz" className='Categories__jazz'>·&nbsp;JAZZ&nbsp;</Link>
                    <Link to="/categories/hip+hop" className='Categories__hiphop'>·&nbsp;HIP HOP&nbsp;</Link>
                    <Link to="/categories/reggae" className='Categories__reggae'>·&nbsp;REGGAE&nbsp;</Link>
                    <Link to="/categories/electronic" className='Categories__techno'>·&nbsp;ELECTRONIC&nbsp;</Link>
                    <Link to="/categories/country" className='Categories__country'>·&nbsp;COUNTRY&nbsp;</Link>
                    <Link to="/categories/classical" className='Categories__classical'>·&nbsp;CLASSICAL&nbsp;</Link>
                    <Link to="/categories/funk" className='Categories__funk'>·&nbsp;FUNK&nbsp;</Link>
                    <Link to="/categories/latin" className='Categories__latin'>·&nbsp;LATIN&nbsp;</Link>
                    <Link to="/categories/folk" className='Categories__folk'>·&nbsp;FOLK&nbsp;</Link></div></div>
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