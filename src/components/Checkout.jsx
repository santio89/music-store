import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import "../styles/css/Checkout.css";

export default function Checkout() {
  const history = useNavigate();

  const {carrito, cartItems, cartClear, cartRemove, total} = useContext(CartContext);

  
  return (  
    <div className="CheckoutWrapper">
        <div className="Checkout">
            <h1>CHECKOUT</h1>
            <button onClick={()=>{history(-1)}}  className='Checkout__back'>⇠ Volver</button>
            <div className='Checkout__details'>
              <ul className='Checkout__details__list'>
                <h3>Lista de compra</h3>
                {carrito.length===0?null:<li className='Checkout__details__list__header'><span>TITULO</span><span>ARTISTA</span><span>PRECIO</span><span>CANT.</span><span>SUBT.</span></li>}
               
                {
                  carrito.map((item, index)=>{
                      let subtotal = item?.item?.precio * item?.item?.count;
                      return(<li key={item?.item?.id + index} className='Checkout__details__list__li'><span>{item?.item?.title}</span> <span>{item?.item?.artists_sort}</span><span>${item?.item?.precio}</span><span>{item?.item?.count}</span><span>${subtotal}</span><button className='Checkout__details__list__remove' aria-label='Eliminar product' title='Eliminar producto' onClick={()=>cartRemove(item?.item?.id)}><i className="bi bi-trash-fill"></i></button></li>)
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
                    <button onClick={()=>{cartClear()}}><i className="bi bi-cart-x-fill"></i>&nbsp;VACIAR CARRITO</button>
                    <Link to="/" onClick={()=>window.scrollTo(0,0)} ><i className="bi bi-cart-plus-fill"></i>&nbsp;SEGUIR COMPRANDO</Link>
                    <button ><i className="bi bi-cart-check-fill"></i>&nbsp;FINALIZAR COMPRA</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
