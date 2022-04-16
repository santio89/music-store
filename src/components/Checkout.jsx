import React, { useContext } from 'react'
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom'
import "../styles/css/Checkout.css"

export default function Checkout() {
  const history = useNavigate();

  const context = useContext(Context);
  const carrito = context.carrito;
  console.log(carrito)

  return (  
    <div className="CheckoutWrapper">
        <div className="Checkout">
            <h1>CHECKOUT</h1>
            <button onClick={()=>{history(-1)}}  className='Checkout__back'>⇠ Volver</button>
            <div className='Checkout__details'>
              <ul className='Checkout__details__list'>
                <h3>Lista de compra</h3>
                {
                  carrito.map(item=>
                    <li key={item.id}><span>{item.item.title}</span> <span>{item.item.artists_sort}</span><span>${item.item.precio}</span></li>
                  )
                }
              </ul>
              <div className='Checkout__details__resumen'>
                <h3>Resumen</h3>
              </div>
            </div>
        </div>
    </div>
  )
}
