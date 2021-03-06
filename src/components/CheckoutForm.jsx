import React, { useState, useEffect, useContext } from 'react';
import '../styles/css/CheckoutForm.css';
import { addDoc, getDoc, doc, collection, getFirestore, serverTimestamp, writeBatch } from 'firebase/firestore';
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from '../Context/AuthContext'

export default function CheckoutForm({ total, toggleCheckoutConfirmation, checkoutSuccessTrue, cart, checkoutCode, setCheckoutCode, cartClear }) {
  const { userData } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [uid, setUid] = useState("");
  const [shopList, setShopList] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const recaptchaRef = React.createRef();


  const resetInputs = () => {
    setName("");
    setEmail("")
    setPhone("")
    setAddress("")
  }

  const order = {
    buyer: { name, email, phone, address, uid },
    shopList: shopList,
    total: total,
    date: serverTimestamp()
  }

  const sendOrder = () => {
    setLoadingCheckout(true);
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    const orderBatch = writeBatch(db);


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

        let newStock = Number(prevStock) - Number(item.count);

        if (newStock <= 0) {
          console.log(`Item ID ${item.id} estaría fuera de stock => Restockeado!`)
        }

        orderBatch.update(productDoc, { stock: newStock });

      }).then(() => {
        if (shopList[index] === shopList[shopList.length - 1]) {
          orderBatch.commit();

          /* adding order */
          addDoc(ordersCollection, order).then(({ id }) => {
            setCheckoutCode(id);
            checkoutSuccessTrue();
            cartClear();
            resetInputs();
            setRecaptchaValid(false);
            window.scrollTo(0, 0);
          }).catch(err => console.log("Error sending order: " + err))
        }
      }).catch((err) => { console.log("Error sending order: " + err) });
    })
  }


  useEffect(() => {
    const carritoList = cart.map(item => {
      return {
        title: item.title,
        artist: item.artists_sort,
        id: item.id,
        price: item.price,
        count: item.count
      }
    })
    setShopList(carritoList);
  }, [cart]);

  useEffect(() => {
    recaptchaRef.current.execute();
  }, [recaptchaRef])

  useEffect(()=>{
    if (checkoutCode !== " "){
      setLoadingCheckout(false)
    }
  }, [checkoutCode])

  useEffect(() => {
    setName(userData?.name != null ? userData?.name : "")
    setEmail(userData?.email != null ? userData?.email : "")
    setPhone(userData?.phone != null ? userData?.phone : "")
    setAddress(userData?.address != null ? userData?.address : "")
    setUid(userData?.uid != null ? userData?.uid : "")
  }, [userData])

  return (
    <>
      <button onClick={() => toggleCheckoutConfirmation()} className='CheckoutForm__back'><i className="bi bi-caret-left-fill"></i></button>
      <form className='CheckoutForm' onSubmit={(e) => {
        e.preventDefault();
        if (recaptchaValid && !loadingCheckout) {
          sendOrder();
        }
      }}>
        <h4>COMPLETAR</h4>
        <div className='CheckoutForm__fields'>
          <fieldset>
            <legend>Nombre Completo</legend>
            <input name="nombre" value={name} onChange={e => setName(e.currentTarget.value)} aria-label='Nombre' type="text" required title="Ingresar nombre" maxLength={200} pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" />
          </fieldset>
          <fieldset>
            <legend>Teléfono</legend>
            <input name="telefono" value={phone} onChange={e => setPhone(e.currentTarget.value)} aria-label='Teléfono' type="tel" title="Ingresar teléfono" pattern="[0-9]{6,20}" required maxLength={20} />
          </fieldset>
          <fieldset>
            <legend>Dirección</legend>
            <input name="direccion" value={address} onChange={e => setAddress(e.currentTarget.value)} aria-label='Dirección' type="text" title="Ingresar dirección" required maxLength={200} />
          </fieldset>
          <fieldset>
            <legend>E-Mail</legend>
            <input name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} aria-label='E-Mail' type="email" title="Ingresar e-mail" required maxLength={320} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
          </fieldset>
        </div>
        <p className='CheckoutForm__total'>Total: ${total}</p>
        <button className='CheckoutForm__send'>
          {loadingCheckout ? <>Procesando<span>.</span><span>.</span><span>.</span></> : <>ENVIAR PEDIDO</>}
        </button>
        <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_RECAPTCHA_KEY} size="invisible" theme="dark" badge='inline' onChange={() => {
          setRecaptchaValid(true)
        }} />
      </form>
    </>
  )
}
