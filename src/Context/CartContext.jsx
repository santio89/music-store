import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  
  const { authUser, userData, firebaseSetUserCart } = useContext(AuthContext);
  const [carrito, setCarrito] = useState(() => localStorage.getItem("msShopList") && localStorage.getItem("msShopList") !== undefined && !authUser ? JSON.parse(localStorage.getItem("msShopList")) : []);
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

  /* local storage persistent entre ventanas */
  useEffect(() => {
    const checkStorageCart = (e) => {
      const { key, newValue } = e;

      if (key === "msShopList" || key === `msShopList-${userData?.uid}`) {
        setCarrito(JSON.parse(newValue));
      }
    }
    window.addEventListener("storage", checkStorageCart)

    return (() => window.removeEventListener("storage", checkStorageCart))
  })
  /* fin local storage persistent entre ventanas */


  /* logout useEffect / separar storage usuario o generico */
  useEffect(() => {
    if (userData?.userCart) {
      setCarrito(JSON.parse(userData.userCart))
    } else {
      setCarrito(localStorage.getItem("msShopList") ? JSON.parse(localStorage.getItem("msShopList")) : [])
    }
  }, [userData])
/* fin logout useEffect */


  useEffect(() => {
    setCartItems(carrito?.reduce((total, item) => total + item?.count, 0));
    setTotal(carrito?.reduce((total, item) => total + item?.price * item?.count, 0));

    if (carrito) {
      if (authUser && userData.uid) {
        localStorage.setItem(`msShopList-${userData.uid}`, JSON.stringify(carrito))
        firebaseSetUserCart(authUser, { userCart: JSON.stringify(carrito) })
      } else if (!authUser) {
        localStorage.setItem("msShopList", JSON.stringify(carrito))
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrito/* , authUser, userData, firebaseSetUserCart */])



  return (
    <>
      <CartContext.Provider value={{ carrito, cartItems, total, cartClear, cartAdd, cartRemove, modifyCount, idCount }}>
        {children}
      </CartContext.Provider>
    </>
  )
}
