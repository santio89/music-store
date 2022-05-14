import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/css/LogInButton.css'
import { AuthContext } from '../Context/AuthContext'
import { useEffect } from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import { motion, AnimatePresence} from 'framer-motion';

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

export default function LogInButton({ navClosed }) {
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
            {userSettings && <div className='userOptions'><Link to="/user/compras" onClick={() => { navClosed(); setUserSettings(false) }} >Compras</Link><Link to="/user/datos" onClick={() => { navClosed(); setUserSettings(false) }} >Datos</Link></div>}
            <AnimatePresence exitBeforeEnter>
                {authUser? <motion.div key="profileWrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: .4 }} className='profilePicWrapper'><button title='Ver Opciones' className={`profilePic ${userSettings ? "is-active" : ""}`} onClick={() => toggleUserSettings()}><img alt="Profile Pic" src={authUser.photoURL}></img></button><button className='logOutBtn' onClick={() => authLogOut()} title="Cerrar Sesión"><i className="bi bi-box-arrow-right"></i></button></motion.div> :
                    <motion.button key="logInBtn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: .4 }} onClick={(e) => { buttonRipple(e); authLogIn() }} className="button is-dark is-size-5 LogInButton" title='Ingresar con Google'>
                        <span className='LogInButton__Ingresar'></span>{authLoading ? <PuffLoader color={"var(--color-one)"} size={30} speedMultiplier={1.2} /> : <><i className="bi bi-google"></i></>}
                    </motion.button> 
                }
            </AnimatePresence>
        </>
    )
}
