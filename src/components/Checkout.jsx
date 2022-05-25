import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import CheckoutItem from './CheckoutItem'
import "../styles/css/Checkout.css";

export default function Checkout() {
  const history = useNavigate();

  const { cart, cartItems, cartClear, cartRemove, total, modifyCount } = useContext(CartContext);

  const [removeItemSelected, setRemoveItemSelected] = useState(0);
  const [cartClearConfirm, setCartClearConfirm] = useState(false);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const checkoutSuccessTrue = () => setCheckoutSuccess(true);

  const [checkoutConfirmation, setCheckoutConfirmation] = useState(false)
  const toggleCheckoutConfirmation = () => {
    setCheckoutConfirmation(!checkoutConfirmation);
  }

  const [checkoutCode, setCheckoutCode] = useState(" ");
  const [checkoutOrder, setCheckoutOrder] = useState([]);



  useEffect(() => {
    const db = getFirestore();
    const orderRef = doc(db, "orders", checkoutCode);

    getDoc(orderRef).then(snapshot => {
      if (snapshot.exists()) {
        setCheckoutOrder(snapshot.data());
      }
    })

  }, [checkoutCode])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CheckoutWrapper">
      <AnimatePresence>
        <motion.div key="Checkout" className="Checkout"
          initial={{ opacity: 0, x: "-120%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "120%" }}
          transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}
        >
          <button onClick={() => { history(-1) }} className='Checkout__back'><i className="bi bi-caret-left-fill"></i></button>
          <h1>CHECKOUT</h1>
          <AnimatePresence exitBeforeEnter>
            {!checkoutSuccess ?
              <LayoutGroup>
                <motion.div layout className='Checkout__details' key="checkoutDetails" initial={{ opacity: 0, x: "-120%" }}
                  animate={{ opacity: 1, x: "0%" }}
                  exit={{ opacity: 0, y: "120%" }}
                  transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>

                  <motion.div layout className='Checkout__details__list'>
                    <motion.h3 layout>Lista de compra</motion.h3>

                    <motion.ul layout className='Checkout__details__list__ul'>

                      <AnimatePresence>
                        {cart.length === 0 ? null : <motion.li layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ y: "-120%", opacity: 0 }} className='Checkout__details__list__header' transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}><motion.span>TITULO</motion.span><motion.span>ARTISTA</motion.span><motion.span>PRECIO</motion.span><motion.span>CANT.</motion.span><motion.span>SUBT.</motion.span></motion.li>}
                      </AnimatePresence>

                      <AnimatePresence>
                        { 
                          cart.map((item) => {
                            return (
                              <CheckoutItem key={item?.id} item={item} modifyCount={modifyCount} removeItemSelected={removeItemSelected} setRemoveItemSelected={setRemoveItemSelected} cartRemove={cartRemove} />
                            )
                          }
                          )
                        }
                      </AnimatePresence>
                    </motion.ul>

                    <motion.div layout className='Checkout__details__list__total'>
                      <AnimatePresence exitBeforeEnter>
                        {cartItems === 0 ? <motion.p layout>No hay productos en el carrito</motion.p> : <motion.p layout>TOTAL: ${total}</motion.p>}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  <motion.div layout className='Checkout__details__resumen'>
                    <motion.h3 layout>Resumen</motion.h3>
                    <AnimatePresence exitBeforeEnter>
                      {!checkoutConfirmation ?
                        <motion.div layout className="Checkout__details__resumen__info" key={"checkoutDetails"} initial={{ opacity: 0, x: "-120%" }}
                          animate={{ opacity: 1, x: "0%" }}
                          exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                          <motion.div layout className="Checkout__details__resumen__cleartextContainer">
                            <AnimatePresence>
                              {cartClearConfirm ?

                                <motion.div layout key="resumenClear" initial={{ opacity: 0, x: "-120%" }}
                                  animate={{ opacity: 1, x: "0%" }}
                                  exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='Checkout__details__resumen__clear'>
                                  <motion.p>VACIAR CARRITO?</motion.p>
                                  <motion.div className="Checkout__details__resumen__clear__buttons">
                                    <motion.button onClick={() => { cartClear(); setCartClearConfirm(false) }}> SI</motion.button>
                                    <motion.button onClick={() => setCartClearConfirm(false)}> NO</motion.button>
                                  </motion.div>
                                </motion.div> :

                                <motion.div layout key="resumenText" initial={{ opacity: 0, x: "-120%" }}
                                  animate={{ opacity: 1, x: "0%" }}
                                  exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className="Checkout__details__resumen__text">
                                  <p>◖Items: {cartItems}<br />◖Total: ${total}<span>(USD)</span></p>
                                </motion.div>}
                            </AnimatePresence>
                          </motion.div>
                          <motion.div layout className='Checkout__details__resumen__buttons'>
                            <button onClick={() => setCartClearConfirm(true)} className={`${cartItems > 0 ? "" : "disabled"}`} >VACIAR CARRITO&nbsp;<i className="bi bi-cart-x-fill"></i></button>

                            <button onClick={() => { toggleCheckoutConfirmation(); setCartClearConfirm(false) }} className={`${cartItems > 0 ? "" : "disabled"}`}>FINALIZAR COMPRA&nbsp;<i className="bi bi-cart-check-fill"></i></button>

                            <Link to="/">SEGUIR COMPRANDO&nbsp;<i className="bi bi-cart-plus-fill"></i></Link>
                          </motion.div>
                        </motion.div> :
                        <motion.div className="Checkout__details__resumen__confirm" key="checkoutConfirm" initial={{ x: "-120%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} exit={{ x: "120%", opacity: 0 }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                          <motion.div layout className='Checkout__details__resumen__confirm__form'>

                            <CheckoutForm total={total} cartItems={cartItems} checkoutSuccessTrue={checkoutSuccessTrue} checkoutCode={checkoutCode} setCheckoutCode={setCheckoutCode} cart={cart} cartClear={cartClear} toggleCheckoutConfirmation={toggleCheckoutConfirmation} />

                          </motion.div>
                        </motion.div>
                      }
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </LayoutGroup> :
              <motion.div className='Checkout__success' key="checkoutSuccess" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: "120%" }}
                transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                <h3>Compra realizada con éxito!</h3>
                <p>Tu código de compra es:<br /><button onClick={() => navigator.clipboard.writeText(checkoutCode)} title="Copiar al portapapeles" className='Checkout__success__code'>{checkoutCode} <i className="bi bi-clipboard"></i></button></p>
                <details className='Checkout__success__details Checkout__success__details--detail'>
                  <summary>Detalle de compra</summary>
                  <div className='Checkout__success__details__items'>
                    {checkoutOrder?.shopList?.map((item) => {
                      return <p key={item.id}><span><span className='Checkout__success__details__items__artist'>{item.artist}</span><br /><span>{item.title.toUpperCase()}</span></span><span>${item.price}</span><span>(x{item.count})</span></p>
                    })}
                  </div>
                  <p className='Checkout__success__details__total'>TOTAL: ${checkoutOrder.total}</p>
                  <p className='Checkout__success__details__date'>Fecha de compra: {(new Date(checkoutOrder?.date?.seconds * 1000).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }))}</p>
                </details>

                <details className='Checkout__success__details Checkout__success__details--buyer'>
                  <summary>Datos del comprador</summary>
                  <p>·&nbsp;Nombre: {checkoutOrder?.buyer?.name}</p>
                  <p>·&nbsp;Apellido: {checkoutOrder?.buyer?.lastName}</p>
                  <p>·&nbsp;Teléfono: {checkoutOrder?.buyer?.phone}</p>
                  <p>·&nbsp;Dirección: {checkoutOrder?.buyer?.address}</p>
                  <p>·&nbsp;E-Mail: {checkoutOrder?.buyer?.email}</p>
                </details>
                <Link to="/" className='Checkout__success__continue'>SEGUIR COMPRANDO ⇢</Link>
              </motion.div>
            }
          </AnimatePresence>
        </motion.div>
      </AnimatePresence >
    </div >
  )
}
