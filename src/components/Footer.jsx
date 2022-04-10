import React from "react";
import '../../src/styles/css/footer.css';
import { Link } from 'react-router-dom'

export default function Footer(){

    return(
        <>
        <footer className="footer">
            <Link to="/" onClick={()=>window.scrollTo(0,0)}>◖Más Vistos</Link>
            <Link to="/categories" onClick={()=>window.scrollTo(0,0)}>◖Categorías</Link>
            <a href="https://santiweb.netlify.app/" className="footer__santi">santiWeb</a>
        </footer>
        </>
    )
}