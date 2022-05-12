import React from 'react'
import '../styles/css/Compras.css'
import { motion, AnimatePresence } from 'framer-motion'

export default function Compras() {
  return (
    <div className='ComprasWrapper'>
      <AnimatePresence>
        <motion.div className='Compras' key={"Compras"} initial={{ opacity: 0, x: "-120%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "120%" }}
          transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
          <h1 className='Compras__title'>Mis Compras</h1>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
