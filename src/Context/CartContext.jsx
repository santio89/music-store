import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const CartContext = createContext();

export default function CartContextProvider({ children }) {

  const { authUser, userData, firebaseSetUserCart, isLoggedIn } = useContext(AuthContext);

  const [carrito, setCarrito] = useState(() => isLoggedIn && localStorage.getItem(`msShopList-${userData?.uid}`) ? JSON.parse(localStorage.getItem(`msShopList-${userData?.uid}`)):[]);
  
  const [cartItems, setCartItems] = useState(0);
  const [total, setTotal] = useState(0);


  const cartAdd = (item) => {
    const itemIndex = carrito.findIndex(producto => producto.id === item.id);
    if (itemIndex !== -1) {
      const newCart = [...carrito];
      newCart[itemIndex].count += item.count;
      setCarrito(newCart);
    } else {
      setCarrito([...carrito, item])
    }
  }

  const modifyCount = (item) => {
    const itemIndex = carrito.findIndex(producto => producto.id === item.id);
    if (itemIndex !== -1) {
      const newCart = [...carrito];
      newCart[itemIndex].count = item.count;
      setCarrito(newCart);
    } else {
      setCarrito([...carrito, { item }])
    }
  }

  const cartRemove = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  }

  const cartClear = () => {
    setCarrito([]);
  }

  const idCount = (id) => {
    for (let item of carrito) {
      if (item.id === id) {
        return item.count;
      }
    }
    return 0;
  }

  /* local storage del user, persistente entre ventanas */
  useEffect(() => {
    const checkStorageCart = (e) => {
      const { key, newValue } = e;

      if (authUser && authUser !== null && userData && userData !== null && userData !== undefined) {
        if (key === `msShopList-${userData?.uid}`) {
          if (newValue !== JSON.stringify(carrito)) {
            setCarrito(JSON.parse(newValue));
          }
        }
      }
    }
    window.addEventListener("storage", checkStorageCart)

    return (() => window.removeEventListener("storage", checkStorageCart))
  })
  /* fin local storage del user, persistente entre ventanas */


  /* logout useEffect / separar storage usuario o generico */
  useEffect(() => {
    if (isLoggedIn) {
      if (userData?.userCart && userData?.userCart != null && userData?.userCart !== undefined) {
        if (JSON.stringify(userData?.userCart) !== JSON.stringify(carrito)){
          setCarrito(JSON.parse(userData?.userCart))
        }
      }
    } else{
      setCarrito([]);
    }
  }, [isLoggedIn, userData, carrito])



  useEffect(() => {
    setCartItems(carrito?.reduce((total, item) => total + item?.count, 0));
    setTotal(carrito?.reduce((total, item) => total + item?.price * item?.count, 0));

    if (carrito) {
      if (authUser && userData?.uid != null) {
        localStorage.setItem(`msShopList-${userData?.uid}`, JSON.stringify(carrito))
        firebaseSetUserCart(authUser, { userCart: JSON.stringify(carrito) })
      }
    }

  }, [carrito, authUser, userData, firebaseSetUserCart])



  return (
    <>
      <CartContext.Provider value={{ carrito, cartItems, total, cartClear, cartAdd, cartRemove, modifyCount, idCount }}>
        {children}
      </CartContext.Provider>
    </>
  )
}
