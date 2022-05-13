import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/css/UserDatos.css'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../Context/AuthContext'
import PuffLoader from "react-spinners/PuffLoader";

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
                            <p>◖&nbsp;Nombre Completo: {userData?.name}</p>
                            <p>◖&nbsp;Teléfono: {userData?.phone}</p>
                            <p>◖&nbsp;Dirección: {userData?.address}</p>
                            <p>◖&nbsp;E-Mail: {userData?.email}</p>
                        </div>
                    </div> : <div className='Datos__nouser'><p>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus datos</p></div>}

                </motion.div>
            </AnimatePresence>}

        </div>
    )
}
