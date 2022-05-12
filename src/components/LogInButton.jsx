import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/css/LogInButton.css'
import { AuthContext } from '../Context/AuthContext'
import { useEffect } from 'react';
import PuffLoader from "react-spinners/PuffLoader";

const buttonRipple = (e) => {
    let x = e.clientX - e.target.getBoundingClientRect().x;
    let y = e.clientY - e.target.getBoundingClientRect().y;
    let ripples = document.createElement("span");
    ripples.classList.add("spanRipple")
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    e.target.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
}

export default function LogInButton({navClosed}) {
    const { authLogIn, authLogOut, authUser, authLoading } = useContext(AuthContext);
    const [userSettings, setUserSettings] = useState(false);

    const toggleUserSettings = () => {
        setUserSettings(userSettings => !userSettings)
    }

    useEffect(() => {
        if (!authUser) {
            setUserSettings(false)
        }
    }, [authUser])

    return (
        <>
            {userSettings ? <div className='userOptions'><Link to="/compras" onClick={()=>navClosed()} >Compras</Link><button onClick={() => authLogOut()}>Salir</button></div> : null}
            {!authUser ? <button onClick={(e) => { buttonRipple(e); authLogIn() }} className="button is-dark is-size-5 LogInButton">
                <span className='LogInButton__Ingresar'>Ingresar: &nbsp;</span>{authLoading?<PuffLoader color={"var(--color-one)"} size={20} speedMultiplier={1.2} />:<i className="bi bi-google"></i>}
            </button> : <button className={`profilePic ${userSettings ? "is-active" : ""}`} onClick={() => toggleUserSettings()}><img alt="Profile Pic" src={authUser.photoURL}></img></button>
            }
        </>
    )
}
