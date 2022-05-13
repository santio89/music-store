import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import "../styles/css/Checkout.css";

export default function Checkout() {
  const history = useNavigate();

  const { carrito, cartItems, cartClear, cartRemove, total, modifyCount } = useContext(CartContext);

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

  

  useEffect(()=>{
    const db = getFirestore();
    const orderRef = doc(db, "orders", checkoutCode);

    getDoc(orderRef).then(snapshot=>{
      if (snapshot.exists()){
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
              <motion.div className='Checkout__details' key="checkoutDetails" initial={{ opacity: 0, x: "-120%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, y: "120%" }}
                transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>

                <div className='Checkout__details__list'>
                  <h3>Lista de compra</h3>

                  <ul className='Checkout__details__list__ul'>

                    <AnimatePresence>
                      {carrito.length === 0 ? null : <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ y: "-120%", opacity: 0 }} className='Checkout__details__list__header' transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}><span>TITULO</span><span>ARTISTA</span><span>PRECIO</span><span>CANT.</span><span>SUBT.</span></motion.li>}
                    </AnimatePresence>


                    <AnimatePresence>

                      {
                        carrito.map((item) => {
                          return (
                            <motion.li key={item?.id} initial={{ opacity: 0, x: "-120%" }} animate={{ opacity: 1, x: "0%" }} exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='Checkout__details__list__li'>
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
                                    <button onClick={() => { setRemoveItemSelected(0); cartRemove(item?.id) }}>SI</button>
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
                  </ul>

                  <div className='Checkout__details__list__total'>
                    <AnimatePresence exitBeforeEnter>
                      {cartItems === 0 ? <motion.p key={"noProducts"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ y: "120%", opacity: 0 }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>No hay productos en el carrito</motion.p> : <motion.p key={"yesProducts"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ y: "120%", opacity: 0 }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>TOTAL: ${total}</motion.p>}
                    </AnimatePresence>
                  </div>

                </div>

                <div className='Checkout__details__resumen'>
                  <h3>Resumen</h3>
                  <AnimatePresence exitBeforeEnter>
                    {!checkoutConfirmation ?
                      <motion.div className="Checkout__details__resumen__info" key={"checkoutDetails"} initial={{ opacity: 0, x: "-120%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                        <div className="Checkout__details__resumen__cleartextContainer">
                          <AnimatePresence>
                            {cartClearConfirm ?

                              <motion.div key="resumenClear" initial={{ opacity: 0, x: "-120%" }}
                                animate={{ opacity: 1, x: "0%" }}
                                exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='Checkout__details__resumen__clear'>
                                <p>VACIAR CARRITO?</p>
                                <div className="Checkout__details__resumen__clear__buttons">
                                  <button onClick={() => { cartClear(); setCartClearConfirm(false) }}> SI</button>
                                  <button onClick={() => setCartClearConfirm(false)}> NO</button>
                                </div>
                              </motion.div> :

                              <motion.div key="resumenText" initial={{ opacity: 0, x: "-120%" }}
                                animate={{ opacity: 1, x: "0%" }}
                                exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className="Checkout__details__resumen__text">
                                <p>◖Items: {cartItems}<br />◖Total: ${total}<span>(USD)</span></p>

                              </motion.div>}
                          </AnimatePresence>
                        </div>
                        <div className='Checkout__details__resumen__buttons'>
                          <button onClick={() => setCartClearConfirm(true)} className={`${cartItems > 0 ? "" : "disabled"}`} >VACIAR CARRITO&nbsp;<i className="bi bi-cart-x-fill"></i></button>

                          <button onClick={() => { toggleCheckoutConfirmation(); setCartClearConfirm(false) }} className={`${cartItems > 0 ? "" : "disabled"}`}>FINALIZAR COMPRA&nbsp;<i className="bi bi-cart-check-fill"></i></button>

                          <Link to="/">SEGUIR COMPRANDO&nbsp;<i className="bi bi-cart-plus-fill"></i></Link>
                        </div>
                      </motion.div> :
                      <motion.div className="Checkout__details__resumen__confirm" key="checkoutConfirm" initial={{ x: "-120%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} exit={{ x: "120%", opacity: 0 }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                        <div className='Checkout__details__resumen__confirm__form'>
                          <button onClick={() => toggleCheckoutConfirmation()} className='Checkout__details__resumen__confirm__form__back'><i className="bi bi-caret-left-fill"></i></button>

                          <CheckoutForm total={total} checkoutSuccessTrue={checkoutSuccessTrue} setCheckoutCode={setCheckoutCode} carrito={carrito} cartClear={cartClear} />

                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </motion.div> :
              <motion.div className='Checkout__success' key="checkoutSuccess" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: "120%" }}
                transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                <h3>Compra realizada con éxito!</h3>
                <p>Tu código de compra es:<br /><button onClick={() => navigator.clipboard.writeText(checkoutCode)} title="Copiar al portapapeles" className='Checkout__success__code'>{checkoutCode} <i className="bi bi-clipboard"></i></button></p>
                <details className='Checkout__success__details Checkout__success__details--detail'>
                  <summary>Detalle de compra</summary>
                  <div className='Checkout__success__details__items'>
                    {checkoutOrder?.shopList?.map((item)=>{
                      return <p key={item.id}><span><span className='Checkout__success__details__items__artist'>{item.artist}</span><br/><span>{item.title.toUpperCase()}</span></span><span>${item.price}</span><span>(x{item.count})</span></p>
                    })}
                  </div>
                  <p className='Checkout__success__details__total'>TOTAL: ${checkoutOrder.total}</p>
                  <p className='Checkout__success__details__date'>Fecha de compra: {(new Date(checkoutOrder?.date?.seconds * 1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: false}))}</p>
                </details>

                <details className='Checkout__success__details Checkout__success__details--buyer'>
                  <summary>Datos del comprador</summary>
                  <p>· Nombre: {checkoutOrder?.buyer?.name}</p>
                  <p>· Apellido: {checkoutOrder?.buyer?.lastName}</p>
                  <p>· Teléfono: {checkoutOrder?.buyer?.phone}</p>
                  <p>· Dirección: {checkoutOrder?.buyer?.address}</p>
                  <p>· E-Mail: {checkoutOrder?.buyer?.email}</p>
                </details>
                <Link to="/" className='Checkout__success__continue'>SEGUIR COMPRANDO ⇢</Link>
              </motion.div>
            }
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
