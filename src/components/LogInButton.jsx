import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/css/LogInButton.css'
import { AuthContext } from '../Context/AuthContext'
import { useEffect } from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import { motion, AnimatePresence } from 'framer-motion';

export default function LogInButton({ navClosed }) {
    const { authLogIn, authLogOut, authUser, authLoading } = useContext(AuthContext);
    const [userSettings, setUserSettings] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);
    const [btnClickedX, setBtnClickedX] = useState("");
    const [btnClickedY, setBtnClickedY] = useState("");

    /* btnRippleStyle */
    const buttonRipple = (e) => {
        setBtnClicked(true);
        setBtnClickedX(e.clientX - e.target.getBoundingClientRect().x);
        setBtnClickedY(e.clientY - e.target.getBoundingClientRect().y);

        setTimeout(() => {
            setBtnClicked(false);
        }, 1000);
    }

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
                {authUser ? <motion.div key="profileWrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: .4 }} className='profilePicWrapper'><button title='Ver Opciones' className={`profilePic ${userSettings ? "is-active" : ""}`} onClick={() => toggleUserSettings()}><img alt="Profile Pic" src={authUser.photoURL}></img></button><button className='logOutBtn' onClick={() => authLogOut()} title="Cerrar Sesión"><i className="bi bi-box-arrow-right"></i></button></motion.div> :
                    <motion.button key="logInBtn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: .4 }} onClick={(e) => { !btnClicked && buttonRipple(e); authLogIn() }} className="button is-dark is-size-5 LogInButton" title='Ingresar con Google'>
                        {btnClicked && <span className='spanRipple' style={{ left: `${btnClickedX}px`, top: `${btnClickedY}px` }} ></span>}{authLoading ? <PuffLoader color={"var(--color-one)"} size={30} speedMultiplier={1.2} /> : <><i className="bi bi-google"></i></>}
                    </motion.button>
                }
            </AnimatePresence>
        </>
    )
}
