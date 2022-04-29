import React, { useState, useEffect } from 'react'
import '../styles/css/CheckoutForm.css'
import { addDoc, updateDoc, getDoc, doc, collection, getFirestore } from 'firebase/firestore'

export default function CheckoutForm({total, checkoutSuccessTrue, carrito, setCheckoutCode, cartClear}) {
    const [name, setName ] = useState("");
    const [lastName, setLastName ] = useState("");
    const [email, setEmail ] = useState("");
    const [phone, setPhone ] = useState("");
    const [address, setAddress ] = useState("");
    const [shopList, setShopList] = useState([]);


    const getDate = ()=>{
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      return(date+' '+time);
    }
    

    const order = {
        buyer: {name, email, phone, address},
        shopList: shopList,
        total: total,
    }  

    const sendOrder = ()=>{
      const db = getFirestore();
      const ordersCollection = collection(db, "orders");
      const productsCollection = collection(db, "products");

/*       shopList.map(item=>{
        const productDoc = doc(db, "products", item.id)
        getDoc(productDoc)
        updateDoc(productDoc, {count: })

      }) */
      
      addDoc(ordersCollection, order).then(({id})=>{
        setCheckoutCode(id);
        checkoutSuccessTrue();
        cartClear();
        window.scrollTo(0, 0);
      }).catch(err=>console.log("Error sending order: "+err))
    }


    useEffect(()=>{
      const carritoList = carrito.map(item=>{return { 
        title: item.title,
        artist: item.artists_sort,
        id: item.id,
        price: item.price,
        quantity: item.count,
        date: getDate()
      }})

      setShopList(carritoList);
    }, [carrito]);



  return (
    <form className='CheckoutForm' onSubmit={(e)=>{e.preventDefault(); sendOrder()}}>
      <h4>Completar datos</h4>
      <div className='CheckoutForm__fields'>
        <fieldset>
          <legend>Nombre</legend>
          <input value={name} onChange={e=>setName(e.currentTarget.value)} aria-label='Nombre' type="text" required title="Ingresar nombre" maxLength={100} />
        </fieldset>
        <fieldset>
          <legend>Apellido</legend> 
          <input value={lastName} onChange={e=>setLastName(e.currentTarget.value)} aria-label='Apellido' type="text" title="Ingresar apellido" required maxLength={100} />
        </fieldset>
        <fieldset>
          <legend>E-Mail</legend>
          <input value={email} onChange={e=>setEmail(e.currentTarget.value)} aria-label='E-Mail' type="email" title="Ingresar e-mail" required maxLength={320} />
        </fieldset>
        <fieldset>
          <legend>Teléfono</legend>
          <input value={phone} onChange={e=>setPhone(e.currentTarget.value)} aria-label='Teléfono' type="tel" title="Ingresar teléfono" pattern="[0-9]{6,20}" required maxLength={40} />
        </fieldset>
        <fieldset>
          <legend>Dirección</legend>
          <input value={address} onChange={e=>setAddress(e.currentTarget.value)} aria-label='Dirección' type="text" title="Ingresar dirección" required maxLength={200} />
        </fieldset>
      </div>
      <p className='CheckoutForm__total'>Total: ${total}</p>
      <button className='CheckoutForm__send'>Enviar pedido</button>
    </form>
  )
}
