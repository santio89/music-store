import React, { useEffect } from 'react'
import '../styles/css/Compras.css'
import { motion, AnimatePresence } from 'framer-motion'

export default function Compras() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className='ComprasWrapper'>
      <AnimatePresence>
        <motion.div className='Compras' key={"Compras"} initial={{ opacity: 0, x: "-120%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "120%" }}
          transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
          <h1 className='Compras__title'>Mis Compras</h1>

          {/*           <details className='Checkout__success__details Checkout__success__details--detail'>
            <summary>Detalle de compra</summary>
            <div className='Checkout__success__details__items'>
              {checkoutOrder?.shopList?.map((item) => {
                return <p key={item.id}><span><span className='Checkout__success__details__items__artist'>{item.artist}</span><br /><span>{item.title.toUpperCase()}</span></span><span>${item.price}</span><span>(x{item.count})</span></p>
              })}
            </div>
            <p className='Checkout__success__details__total'>TOTAL: ${checkoutOrder.total}</p>
            <p className='Checkout__success__details__date'>Fecha de compra: {(new Date(checkoutOrder?.date?.seconds * 1000).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }))}</p>
          </details> */}


        </motion.div>
      </AnimatePresence>
    </div>
  )
}
