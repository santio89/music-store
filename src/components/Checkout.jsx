import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/css/Checkout.css"

export default function Checkout() {
  const history = useNavigate();
  
  return (
    <div className="CheckoutWrapper">
        <div className="Checkout">
            <h1>CHECKOUT</h1>
            <button onClick={()=>{history(-1)}}  className='Checkout__back'>⇠ Volver</button>
            <div className='Checkout__Details'>
              
            </div>
        </div>
    </div>
  )
}
