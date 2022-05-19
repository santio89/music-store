import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  
  const { authUser, userData, firebaseSetUserCart } = useContext(AuthContext);
  const [cart, setCart] = useState(() => localStorage.getItem("msCartList") && localStorage.getItem("msCartList") !== undefined && !authUser ? JSON.parse(localStorage.getItem("msCartList")) : []);
  const [cartItems, setCartItems] = useState(0);
  const [total, setTotal] = useState(0);


  const cartAdd = (item) => {
    const itemIndex = cart.findIndex(producto => producto.id === item.id);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].count += item.count;
      setCart(newCart);
    } else {
      setCart([...cart, item])
    }
  }

  const modifyCount = (item) => {
    const itemIndex = cart.findIndex(producto => producto.id === item.id);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].count = item.count;
      setCart(newCart);
    } else {
      setCart([...cart, { item }])
    }
  }

  const cartRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  }

  const cartClear = () => {
    setCart([]);
  }

  const idCount = (id) => {
    for (let item of cart) {
      if (item.id === id) {
        return item.count;
      }
    }
    return 0;
  }

  /* local storage persistent entre ventanas */
  useEffect(() => {
    const checkStorageCart = (e) => {
      const { key, newValue } = e;

      if (key === "msCartList" || key === `msCartList-${userData?.uid}`) {
        setCart(JSON.parse(newValue));
      }
    }
    window.addEventListener("storage", checkStorageCart)

    return (() => window.removeEventListener("storage", checkStorageCart))
  })
  /* fin local storage persistent entre ventanas */


  /* logout useEffect / separar storage usuario o generico */
  useEffect(() => {
    if (userData?.userCart) {
      setCart(JSON.parse(userData.userCart))
    } else {
      setCart(localStorage.getItem("msCartList") ? JSON.parse(localStorage.getItem("msCartList")) : [])
    }
  }, [userData])
/* fin logout useEffect */


  useEffect(() => {
    setCartItems(cart?.reduce((total, item) => total + item?.count, 0));
    setTotal(cart?.reduce((total, item) => total + item?.price * item?.count, 0));

    if (cart) {
      if (authUser && userData.uid) {
        localStorage.setItem(`msCartList-${userData.uid}`, JSON.stringify(cart))
        firebaseSetUserCart(authUser, { userCart: JSON.stringify(cart) })
      } else if (!authUser) {
        localStorage.setItem("msCartList", JSON.stringify(cart))
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart/* , authUser, userData, firebaseSetUserCart */])



  return (
    <>
      <CartContext.Provider value={{ cart, cartItems, total, cartClear, cartAdd, cartRemove, modifyCount, idCount }}>
        {children}
      </CartContext.Provider>
    </>
  )
}
