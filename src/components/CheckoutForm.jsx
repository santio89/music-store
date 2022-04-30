import React, { useState, useEffect } from 'react';
import '../styles/css/CheckoutForm.css';
import { addDoc, getDoc, doc, collection, getFirestore, serverTimestamp, writeBatch } from 'firebase/firestore';

export default function CheckoutForm({ total, checkoutSuccessTrue, carrito, setCheckoutCode, cartClear }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shopList, setShopList] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);


  const order = {
    buyer: { name, email, phone, address },
    shopList: shopList,
    total: total,
    date: serverTimestamp()
  }

  const sendOrder = () => {
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    const orderBatch = writeBatch(db);
    setLoadingCheckout(true);

    
    shopList.forEach((item, index) => {
      let productDoc = doc(db, "products", String(item.id));
      let prevStock = 0;  


      /* discounting stock - adding to batch*/
      getDoc(productDoc).then(snapshot => {
        if (snapshot.exists()) {
          if (snapshot.data().stock) {
            prevStock = snapshot.data().stock;
          }
        }

        let newStock =  Number(prevStock) - Number(item.count);

        if (newStock <= 0) {
          console.log(`Item ID ${item.id} estaría fuera de stock => Restockeado!`)
        }

        orderBatch.update(productDoc, { stock: newStock });

      }).then(() => {
        if (shopList[index] === shopList[shopList.length-1]){
          orderBatch.commit();

             /* adding order */
            addDoc(ordersCollection, order).then(({ id }) => {
              setCheckoutCode(id);
              checkoutSuccessTrue();
              cartClear();  
              setLoadingCheckout(false);
              window.scrollTo(0, 0);
            }).catch(err => console.log("Error sending order: " + err))
        }
      }).catch((err)=>{console.log("Error sending order: "+err)});
    })
  }


  useEffect(() => {
    const carritoList = carrito.map(item => {
      return {
        title: item.title,
        artist: item.artists_sort,
        id: item.id,
        price: item.price,
        count: item.count
      }
    })

    setShopList(carritoList);
  }, [carrito]);



  return (
    <form className='CheckoutForm' onSubmit={(e) => { e.preventDefault(); sendOrder() }}>
      <h4>Completar datos</h4>
      <div className='CheckoutForm__fields'>
        <fieldset>
          <legend>Nombre</legend>
          <input value={name} onChange={e => setName(e.currentTarget.value)} aria-label='Nombre' type="text" required title="Ingresar nombre" maxLength={100} />
        </fieldset>
        <fieldset>
          <legend>Apellido</legend>
          <input value={lastName} onChange={e => setLastName(e.currentTarget.value)} aria-label='Apellido' type="text" title="Ingresar apellido" required maxLength={100} />
        </fieldset>
        <fieldset>
          <legend>E-Mail</legend>
          <input value={email} onChange={e => setEmail(e.currentTarget.value)} aria-label='E-Mail' type="email" title="Ingresar e-mail" required maxLength={320} />
        </fieldset>
        <fieldset>
          <legend>Teléfono</legend>
          <input value={phone} onChange={e => setPhone(e.currentTarget.value)} aria-label='Teléfono' type="tel" title="Ingresar teléfono" pattern="[0-9]{6,20}" required maxLength={40} />
        </fieldset>
        <fieldset>
          <legend>Dirección</legend>
          <input value={address} onChange={e => setAddress(e.currentTarget.value)} aria-label='Dirección' type="text" title="Ingresar dirección" required maxLength={200} />
        </fieldset>
      </div>
      <p className='CheckoutForm__total'>Total: ${total}</p>
      <button className='CheckoutForm__send'>
        {loadingCheckout?<>Procesando<span>.</span><span>.</span><span>.</span></>:<>Enviar pedido</>}
      </button>
    </form>
  )
}
