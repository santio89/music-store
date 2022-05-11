import React, { useContext, useState } from 'react'
import '../styles/css/LogInButton.css'
import { AuthContext } from '../Context/AuthContext'
import { useEffect } from 'react';

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
    const { authLogIn, authLogOut, authUser } = useContext(AuthContext);
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
            {userSettings ? <div className='userOptions'><button onClick={() => authLogOut()}>Salir</button>{/* <button >Compras</button> */}</div> : null}
            {!authUser ? <button onClick={(e) => { buttonRipple(e); authLogIn() }} className="button is-dark is-size-5-widescreen is-size-6-desktop is-size-5-touch LogInButton">
                Ingresar
            </button> : <button className={`profilePic ${userSettings ? "is-active" : ""}`} onClick={() => toggleUserSettings()}><img alt="Profile Pic" src={authUser.photoURL}></img></button>
            }
        </>
    )
}
