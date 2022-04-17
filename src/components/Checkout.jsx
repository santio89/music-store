import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom'
import "../styles/css/Checkout.css"

export default function Checkout() {
  const history = useNavigate();

  const context = useContext(CartContext);
  const carrito = context.carrito;
  const clear = context.cartClear;

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
                  carrito.map(item=>
                    <li key={item.id}><span>{item.item.title}</span> <span>{item.item.artists_sort}</span><span>${item.item.precio}</span><span>1</span><span>$subt</span></li>
                  )
                }
                {carrito.length===0?<li>No hay productos en el carrito</li>:<li>TOTAL: ${"total"}</li>}
              </ul>
              <div className='Checkout__details__resumen'>
                <h3>Resumen</h3>
                <div className='Checkout__details__resumen__buttons'>
                  <button onClick={()=>{clear()}}><i className="bi bi-cart-x-fill"></i>&nbsp;VACIAR CARRITO</button>
                  <button ><i class="bi bi-cart-check-fill"></i>&nbsp;FINALIZAR COMPRA</button>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
