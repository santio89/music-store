import React, { useState } from 'react'
import '../styles/css/CheckoutForm.css'

export default function CheckoutForm({total}) {
/*     const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [phone, setPhone ] = useState("");
    const [address, setAddress ] = useState("");

    let buyer = {
        buyer: {name, email, address, phone};
        shopList: cart;
        total: total;
    } */  

  return (
    <form className='CheckoutForm'>
      <h4>Completar datos</h4>
      <div className='CheckoutForm__fields'>
        <fieldset>
          <legend>Nombre</legend>
          <input type="text" required  />
        </fieldset>
        <fieldset>
          <legend>Apellido</legend>
          <input type="text" required  />
        </fieldset>
        <fieldset>
          <legend>E-Mail</legend>
          <input type="email" required  />
        </fieldset>
        <fieldset>
          <legend>Teléfono</legend>
          <input type="tel" pattern="[0-9]+" required  />
        </fieldset>
        <fieldset>
          <legend>Dirección</legend>
          <input type="text" required  />
        </fieldset>
      </div>
      <p className='CheckoutForm__total'>Total: ${total}</p>
      <button className='CheckoutForm__send'>Enviar pedido</button>
    </form>
  )
}
