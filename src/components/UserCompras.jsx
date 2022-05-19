import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/css/UserCompras.css'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../Context/AuthContext'
import { getDocs, where, collection, getFirestore, query, orderBy } from 'firebase/firestore'
import PuffLoader from "react-spinners/PuffLoader";

export default function UserCompras() {

  const { authUser, authLogIn, isLoggedIn, userData } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState(null);
  const [comprasLoading, setComprasLoading] = useState(true)
  const history = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);

    if (authUser || isLoggedIn) {
      const database = getFirestore();
      const ordersCollection = collection(database, "orders");
      const userOrders = query(ordersCollection, where("buyer.uid", "==", `${authUser?.uid}`), orderBy("date", "desc"));
      let orders = []

      getDocs(userOrders).then(snapshot => {
        snapshot.docs.forEach(doc => {
          const docObj = { ...doc.data(), orderId: doc.id }
          orders = [...orders, docObj]
        })
        setUserOrders(orders);
      }).catch((e)=>console.log("error fetching orders: ", e))
    }

  }, [authUser, isLoggedIn])

  useEffect(() => {
    if (userOrders) {
      setComprasLoading(false)
    }
  }, [userOrders])

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='ComprasWrapper'>
      {comprasLoading ? <PuffLoader color={"var(--color-one)"} loading={comprasLoading} size={200} speedMultiplier={1.2} /> : <AnimatePresence>
        <motion.div className='Compras' key={"Compras"} initial={{ opacity: 0, x: "-120%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "120%" }}
          transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
          <button onClick={() => { history(-1) }} className='Compras__back'><i className="bi bi-caret-left-fill"></i></button>
          <h1 className='Compras__title'>Mis Compras</h1>

          {authUser || isLoggedIn ? <div className='Compras__details'>
            {
              userData && userOrders && userOrders.length === 0 ? <div className='Compras__noorder'><p>Aún no has realizado ninguna compra.<br /><Link to="/">SEGUIR NAVEGANDO</Link></p></div> : userData && userOrders && userOrders.map(order => {
                return (<details key={order.orderId} className='Compras__details__order'>
                  <summary>{(new Date(order.date.seconds * 1000).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }))}</summary>
                  <div className='Compras__details__order__items'>
                    {order.shopList.map((item) => {
                      return <p key={item.id}><span><span className='Compras__details__order__items__artist'>{item.artist}</span><br /><span>{item.title.toUpperCase()}</span></span><span>${item.price}</span><span>(x{item.count})</span></p>
                    })}
                  </div>
                  <p className='Compras__details__total'>TOTAL: ${order.total}</p>
                  <p className='Compras__details__id'>ID de compra: {order.orderId}</p>
                </details>)
              })

            }

          </div> : <div className='Compras__nouser'><p>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus compras</p></div>}

        </motion.div>
      </AnimatePresence>}

    </div>
  )
}
