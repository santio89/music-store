import React from "react";
import '../../src/styles/css/footer.css';
import { Link } from 'react-router-dom'

export default function Footer() {

    return (
        <>
            <footer className="footer">
                <button className="footer__brand" onClick={()=>window.scrollTo(0, 0)}>MusicStore</button>
                <Link to="/">◖Más Vistos</Link>
                <Link to="/categories">◖Categorías</Link>
                <a href="https://santiweb.netlify.app/" target="_blank" rel="noreferrer" className="footer__santi">santiWeb</a>
            </footer>
        </>
    )
}