import React, { useState } from 'react'
import '../styles/css/CheckoutForm.css'

export default function CheckoutForm({total, checkoutSuccessTrue, carrito}) {
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [phone, setPhone ] = useState("");
    const [address, setAddress ] = useState("");
    console.log(carrito)


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
    <form className='CheckoutForm' onSubmit={(e)=>{e.preventDefault(); }}>
      <h4>Completar datos</h4>
      <div className='CheckoutForm__fields'>
        <fieldset>
          <legend>Nombre</legend>
          <input aria-label='Nombre' type="text" required  />
        </fieldset>
        <fieldset>
          <legend>Apellido</legend>
          <input aria-label='Apellido' type="text" required  />
        </fieldset>
        <fieldset>
          <legend>E-Mail</legend>
          <input aria-label='E-Mail' type="email" required  />
        </fieldset>
        <fieldset>
          <legend>Teléfono</legend>
          <input aria-label='Teléfono' type="tel" pattern="[0-9]+" required  />
        </fieldset>
        <fieldset>
          <legend>Dirección</legend>
          <input aria-label='Dirección' type="text" required  />
        </fieldset>
      </div>
      <p className='CheckoutForm__total'>Total: ${total}</p>
      <button className='CheckoutForm__send' onClick={()=>{window.scrollTo(0, 0); checkoutSuccessTrue()}} >Enviar pedido</button>
    </form>
  )
}
