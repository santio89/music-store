import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import '../../src/styles/css/Error404.css';

export default function Error404() {
  useEffect(()=>{
    window.scrollTo(0, 0)
  }, []);
  
  return (
    <AnimatePresence>
      <motion.div className="Error404Wrapper" key="Error404" 
      initial={{ opacity: 0, transform: "translateX(-120%)" }}
      animate={{ opacity: 1, transform: "translateX(0%)" }}
      exit={{ opacity: 0, transform: "translateX(120%)" }} 
      transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
          <div className='Error404'>
              <h2>Error 404</h2>
              <p>El contenido al que intenta acceder no existe o no está disponible en este momento.</p>
              <Link to="/">Ir al Inicio?</Link>
          </div>
      </motion.div>
    </AnimatePresence>
  )
}
