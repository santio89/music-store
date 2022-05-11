import React, { useContext } from 'react'
import '../styles/css/LogInButton.css'
import { AuthContext } from '../Context/AuthContext'

const buttonRipple = (e) => {
    let x = e.clientX - e.target.getBoundingClientRect().x;
    let y = e.clientY - e.target.getBoundingClientRect().y;
    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    e.target.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
}

export default function LogInButton() {
    const { authLogIn } = useContext(AuthContext);
    
    return (
        <button onClick={(e)=>{buttonRipple(e); authLogIn()}} className="button is-dark is-size-5-widescreen is-size-6-desktop is-size-5-touch LogInButton">
            Ingresar
        </button>
    )
}
