import React from 'react'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import '../../src/styles/css/Categories.css';

export default function Categories() {
  return (
    <div className='CategoriesWrapper'>
      <AnimatePresence>
          <motion.div key="Categories" 
          initial={{ opacity: 0, transform: "translateX(-120%)" }} 
          animate={{ opacity: 1, transform: "translateX(0%)" }} 
          exit={{ opacity: 0, transform: "translateX(120%)" }} 
          transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}  
          className='Categories'>
                <Link to="/categories/rock" onClick={()=>window.scrollTo(0,0)} className='Categories__rock'>ROCK</Link>
                <Link to="/categories/pop" onClick={()=>window.scrollTo(0,0)} className='Categories__pop'>POP</Link>
                <Link to="/categories/blues" onClick={()=>window.scrollTo(0,0)} className='Categories__blues'>BLUES</Link>
                <Link to="/categories/jazz" onClick={()=>window.scrollTo(0,0)} className='Categories__jazz'>JAZZ</Link>
                <Link to="/categories/hip+hop" onClick={()=>window.scrollTo(0,0)} className='Categories__rap'>HIP HOP</Link>
                <Link to="/categories/reggae" onClick={()=>window.scrollTo(0,0)} className='Categories__reggae'>REGGAE</Link>
                <Link to="/categories/electronic" onClick={()=>window.scrollTo(0,0)} className='Categories__techno'>ELECTRONIC</Link>
                <Link to="/categories/country" onClick={()=>window.scrollTo(0,0)} className='Categories__country'>COUNTRY</Link>
                <Link to="/categories/classical" onClick={()=>window.scrollTo(0,0)} className='Categories__classical'>CLASSICAL</Link>
                <Link to="/categories/funk" onClick={()=>window.scrollTo(0,0)} className='Categories__funk'>FUNK</Link>
                <Link to="/categories/latin" onClick={()=>window.scrollTo(0,0)} className='Categories__latin'>LATIN</Link>
                <Link to="/categories/folk" onClick={()=>window.scrollTo(0,0)} className='Categories__folk'>FOLK</Link>
          </motion.div>
        </AnimatePresence>
    </div>
  )
}
