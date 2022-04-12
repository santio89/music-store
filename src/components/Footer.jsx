import React from "react";
import '../../src/styles/css/footer.css';
import { Link } from 'react-router-dom'

export default function Footer(){

    return(
        <>
        <footer className="footer">
            <div className="footer__brand">MusicStore</div>
            <Link to="/" onClick={()=>window.scrollTo(0,0)}>◖Más Vistos</Link>
            <Link to="/categories" onClick={()=>window.scrollTo(0,0)}>◖Categorías</Link>
            <a href="https://santiweb.netlify.app/" target="_blank" rel="noreferrer" className="footer__santi">santiWeb</a>
        </footer>
        </>
    )
}