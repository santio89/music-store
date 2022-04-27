import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
/* import { CheckoutForm } from './CheckoutForm'; */
import "../styles/css/Checkout.css";

export default function Checkout() {
  const history = useNavigate();

  const { carrito, cartItems, cartClear, cartRemove, total, modifyCount } = useContext(CartContext);

  const [removeItemSelected, setRemoveItemSelected] = useState(0);
  const [cartClearConfirm, setCartClearConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CheckoutWrapper">
      <AnimatePresence>
        <motion.div key="Checkout" className="Checkout"
          initial={{ opacity: 0, transform: "translateX(-120%)" }}
          animate={{ opacity: 1, transform: "translateX(0%)" }}
          exit={{ opacity: 0, transform: "translateX(120%)" }}
          transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}
        >
          <button onClick={() => { history(-1) }} className='Checkout__back'>⇠ Volver</button>
          <h1>CHECKOUT</h1>
          <motion.div className='Checkout__details'>

            <div className='Checkout__details__list'>
              <ul className='Checkout__details__list__ul'>
                <h3>Lista de compra</h3>
                {carrito.length === 0 ? null : <li className='Checkout__details__list__header'><span>TITULO</span><span>ARTISTA</span><span>PRECIO</span><span>CANT.</span><span>SUBT.</span></li>}

               
                  <AnimatePresence>

                    {
                      carrito.map((item) => {
                        return (
                          <motion.li key={item?.id} initial={{ opacity: 0, transform: "translateX(-120%)" }} animate={{ opacity: 1, transform: "translateX(0%)" }} exit={{ opacity: 0, transform: "translateX(120%)" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='Checkout__details__list__li'>
                            <span><Link to={`/item/${item?.id}`}><img alt="item" src={item?.images?.[0]?.uri}></img></Link><span className='Checkout__details__list__li__title'>{item?.title}</span></span>
                            <span>{item?.artists_sort}</span>
                            <span>${item?.price}</span>
                            <span className='Checkout__details__list__li__input'><input type="number" min={0} defaultValue={item?.count} onBlur={e => {
                              e.target.value = e.target.value < 0 ? 0 : Math.round(e.target.value);
                              if (Number(e.target.value) > Number(item.stock)) {
                                e.target.value = item.stock;
                                modifyCount({ ...item, count: Number(e.target.value) });
                              } else {
                                modifyCount({ ...item, count: Number(e.target.value) });
                              }
                            }} onKeyDown={(e) => e.key !== "Enter" ? (e.key !== 'Escape' ? null : e.target.blur()) : e.target.blur()} /> <span className='Checkout__details__list__li__stock'>Stock: {item.stock}</span></span>
                            <span>${item?.price * item?.count}</span>
                            {
                              removeItemSelected === item?.id ? <div className='Checkout__details__list__removeConfirm'>
                                <p>ELIMINAR?</p>
                                <div className="Checkout__details__list__removeConfirm__buttons">
                                  <button onClick={() => { cartRemove(item?.id) }}>SI</button>
                                  <button onClick={() => setRemoveItemSelected(0)}>NO</button>
                                </div>
                              </div> : <button className='Checkout__details__list__remove' aria-label='Eliminar product' title='Eliminar producto' onClick={() => setRemoveItemSelected(item?.id)}><i className="bi bi-trash-fill"></i></button>
                            }
                          </motion.li>
                        )
                      }
                      )
                    }
                  </AnimatePresence>
               
                <li>  
                  <AnimatePresence exitBeforeEnter>
                    {cartItems === 0 ? <motion.p key={"noProducts"} initial={{ opacity: 0 }} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>No hay productos en el carrito</motion.p> : <motion.p key={"yesProducts"} initial={{ opacity: 0 }} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>TOTAL: ${total}</motion.p>}
                  </AnimatePresence>
                </li>
              </ul>
            </div>
            <div className='Checkout__details__resumen'>
              <h3>Resumen</h3>
              <div className="Checkout__details__resumen__info">
                <div className="Checkout__details__resumen__cleartextContainer">
                  <AnimatePresence>
                    {cartClearConfirm ?

                      <motion.div key="resumenClear" initial={{ opacity: 0, transform: "translateX(-120%)" }}
                        animate={{ opacity: 1, transform: "translateX(0%)" }}
                        exit={{ opacity: 0, transform: "translateX(120%)" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='Checkout__details__resumen__clear'>
                        <p>VACIAR CARRITO?</p>
                        <div className="Checkout__details__resumen__clear__buttons">
                          <button onClick={() => { cartClear(); setCartClearConfirm(false) }}> SI</button>
                          <button onClick={() => setCartClearConfirm(false)}> NO</button>
                        </div>
                      </motion.div> :

                      <motion.div key="resumenText" initial={{ opacity: 0, transform: "translateX(-120%)" }}
                        animate={{ opacity: 1, transform: "translateX(0%)" }}
                        exit={{ opacity: 0, transform: "translateX(120%)" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className="Checkout__details__resumen__text">
                        <p>◖Items: {cartItems}<br />◖Total: ${total}</p>

                      </motion.div>}
                  </AnimatePresence>
                </div>
                <div className='Checkout__details__resumen__buttons'>
                  <button onClick={() => setCartClearConfirm(true)}>VACIAR CARRITO&nbsp;<i className="bi bi-cart-x-fill"></i></button>


                  <Link to="/">SEGUIR COMPRANDO&nbsp;<i className="bi bi-cart-plus-fill"></i></Link>

                  <button >FINALIZAR COMPRA&nbsp;<i className="bi bi-cart-check-fill"></i></button>
                </div>
              </div>

              {/*      <div className="Checkout__details__resumen__confirm">

                    </div> */}

            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
