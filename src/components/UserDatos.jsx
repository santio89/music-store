import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/css/UserDatos.css'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../Context/AuthContext'
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

export default function UserDatos() {
    const { userData, authLogIn, userDataLoading } = useContext(AuthContext);
    const [datosLoading, setDatosLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (userDataLoading === false) {
            setDatosLoading(false);
        }
    }, [userDataLoading])

    return (
        <div className='ComprasWrapper'>
            {datosLoading ? <PuffLoader color={"var(--color-one)"} loading={datosLoading} size={200} speedMultiplier={1.2} /> : <AnimatePresence>
                <motion.div className='Datos' key={"Datos"} initial={{ opacity: 0, x: "-120%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "120%" }}
                    transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                    <button onClick={() => { history(-1) }} className='Datos__back'><i className="bi bi-caret-left-fill"></i></button>
                    <h1 className='Datos__title'>Mis Datos</h1>

                    {userData && userData != null ? <div className='Datos__details'>
                        <div className='Datos__details__pWrapper'>
                            <p>·&nbsp;Nombre Completo: <span>{userData?.name}</span></p>
                            <p>·&nbsp;Teléfono: <span>{userData?.phone}</span></p>
                            <p>·&nbsp;Dirección: <span>{userData?.address}</span></p>
                            <p>·&nbsp;E-Mail: <span>{userData?.email}</span></p>
                        </div>
                        <div className='Datos__details__btnContainer'>
                            <button onClick={(e) => { buttonRipple(e) }} className="button is-danger is-size-5 Datos__details__btnContainer__btn">Editar</button>
                            <button onClick={(e) => { buttonRipple(e) }} className="button is-danger is-size-5 Datos__details__btnContainer__btn">Guardar</button>
                        </div>
                    </div> : <div className='Datos__nouser'><p>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus datos</p></div>}

                </motion.div>
            </AnimatePresence>}

        </div>
    )
}
