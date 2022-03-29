import React from "react"
import '../../src/styles/css/LogInButton.css';


const buttonRipple = (e)=>{
    let logInButton = document.querySelector(".button__logIn");
    let x = e.clientX - e.target.getBoundingClientRect().x;
    let y = e.clientY - e.target.getBoundingClientRect().y;
    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    logInButton.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
}

export default function LogInButton (){
    return(
        <button onClick={buttonRipple} className="button is-dark is-size-5-widescreen is-size-6-desktop is-size-5-touch button__logIn">
            Ingresar
        </button>
    )
}