import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import "../styles/css/Checkout.css";

export default function Checkout() {
  const history = useNavigate();

  const {carrito, cartItems, cartClear, cartRemove, total, modifyCount} = useContext(CartContext);

  return (  
    <div className="CheckoutWrapper">
        <AnimatePresence>
          <motion.div key="Checkout" className="Checkout" 
          initial={{opacity: 0, transform: "translateX(-120%)"}} 
          animate={{opacity: 1, transform: "translateX(0%)"}} 
          exit={{opacity: 0, transform: "translateX(120%)"}} 
          transition={{type: "spring", duration: .8}}
          >
              <button onClick={()=>{history(-1)}}  className='Checkout__back'>⇠ Volver</button>
              <h1>CHECKOUT</h1>
              
              <div className='Checkout__details'>
                <ul className='Checkout__details__list'>
                  <h3>Lista de compra</h3>
                  {carrito.length===0?null:<li className='Checkout__details__list__header'><span>TITULO</span><span>ARTISTA</span><span>PRECIO</span><span>CANT.</span><span>SUBT.</span></li>}
                
                  {
                    carrito.map((item)=>{
                        return(
                        <li key={item?.id} className='Checkout__details__list__li'>
                          <span><Link to={`/item/${item?.id}`} onClick={()=>window.scrollTo(0,0)}><img alt="item" src={item?.images?.[0]?.uri}></img></Link><span className='Checkout__details__list__li__title'>{item?.title}</span></span> 
                          <span>{item?.artists_sort}</span>
                          <span>${item?.precio}</span>
                          <span className='Checkout__details__list__li__input'><input type="number" min={0} defaultValue={item?.count} onBlur={e=>{
                            e.target.value = e.target.value<0?0:Math.round(e.target.value);
                            if(Number(e.target.value) > Number(item.stockInitial)){
                              e.target.value = item.stockInitial;
                              modifyCount({...item, count: Number(e.target.value)});
                            } else{
                              modifyCount({...item, count: Number(e.target.value)});
                            }
                          }} onKeyDown={(e)=>e.key!=="Enter"?(e.key!=='Escape'?null:e.target.blur()):e.target.blur()}/> <span className='Checkout__details__list__li__stock'>Stock: {item.stockInitial}</span></span>
                          <span>${item?.precio * item?.count}</span>
                          <button className='Checkout__details__list__remove' aria-label='Eliminar product' title='Eliminar producto' onClick={()=>cartRemove(item?.id)}><i className="bi bi-trash-fill"></i></button>
                        </li>)
                      }
                    )
                  }
                  {carrito.length===0?<li>No hay productos en el carrito</li>:<li>TOTAL: ${total}</li>}
                </ul>
                <div className='Checkout__details__resumen'>
                  <h3>Resumen</h3>
                  <div className="Checkout__details__resumen__info">
                    <div className="Checkout__details__resumen__text">
                      <p>◖Items: {cartItems}</p>
                      <p>◖Total: ${total}</p>
                    </div>
                    <div className='Checkout__details__resumen__buttons'>
                      <button onClick={()=>{cartClear()}}>VACIAR CARRITO&nbsp;<i className="bi bi-cart-x-fill"></i></button>
                      <Link to="/" onClick={()=>window.scrollTo(0,0)}>SEGUIR COMPRANDO&nbsp;<i className="bi bi-cart-plus-fill"></i></Link>
                      <button >FINALIZAR COMPRA&nbsp;<i className="bi bi-cart-check-fill"></i></button>
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
        </AnimatePresence>
    </div>
  )
}
