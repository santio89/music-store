import React, { useState } from 'react'

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
    <form>
      <h4>Completar datos</h4>
      
      <p>Total: ${total}</p>
      <button>Enviar pedido</button>
    </form>
  )
}
