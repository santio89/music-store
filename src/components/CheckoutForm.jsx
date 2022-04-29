import React, { useState } from 'react'
import '../styles/css/CheckoutForm.css'

export default function CheckoutForm({total, checkoutSuccessTrue, carrito}) {
    const [name, setName ] = useState("");
    const [lastName, setLastName ] = useState("");
    const [email, setEmail ] = useState("");
    const [phone, setPhone ] = useState("");
    const [address, setAddress ] = useState("");


    const getDate = ()=>{
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      return(date+' '+time);
    }

    const carritoList = carrito.map(item=>{return { 
      title: item.title,
      artist: item.artists_sort,
      genre: item.genres,
      released: item.year,
      label: item.labels[0],
      format: item.formats[0],
      price: item.price,
      quantity: item.count,
      date: getDate(),
      
    }})

    const buyer = {
        buyer: {name, email, phone, address},
        shopList: carritoList,
        total: total,
    }  

  return (
    <form className='CheckoutForm' onSubmit={(e)=>{e.preventDefault(); window.scrollTo(0, 0); checkoutSuccessTrue()}}>
      <h4>Completar datos</h4>
      <div className='CheckoutForm__fields'>
        <fieldset>
          <legend>Nombre</legend>
          <input value={name} onChange={e=>setName(e.currentTarget.value)} aria-label='Nombre' type="text" required  />
        </fieldset>
        <fieldset>
          <legend>Apellido</legend> 
          <input value={lastName} onChange={e=>setLastName(e.currentTarget.value)} aria-label='Apellido' type="text" required  />
        </fieldset>
        <fieldset>
          <legend>E-Mail</legend>
          <input value={email} onChange={e=>setEmail(e.currentTarget.value)} aria-label='E-Mail' type="email" required  />
        </fieldset>
        <fieldset>
          <legend>Teléfono</legend>
          <input value={phone} onChange={e=>setPhone(e.currentTarget.value)} aria-label='Teléfono' type="tel" pattern="[0-9]+" required  />
        </fieldset>
        <fieldset>
          <legend>Dirección</legend>
          <input value={address} onChange={e=>setAddress(e.currentTarget.value)} aria-label='Dirección' type="text" required  />
        </fieldset>
      </div>
      <p className='CheckoutForm__total'>Total: ${total}</p>
      <button className='CheckoutForm__send'>Enviar pedido</button>
    </form>
  )
}
