import React, { createContext, useState } from 'react'

export const CartContext = createContext();

export default function CartContextProvider({children}) {

    const [carrito, setCarrito] = useState([]);


    const cartAdd = (amount, item)=>{
      let arrayToAdd = [];

      for(let i=0; i<amount;i++){
        arrayToAdd = [...arrayToAdd, {item}]
      }
      
      setCarrito([...carrito, ...arrayToAdd])

    }

    const cartSub = (id)=>{
      
      setCarrito(carrito=>{carrito.filter(item=>item.id!==id)})
    }

    const cartClear = ()=>{
      setCarrito([]);
    }

    const itemsTotal = ()=>{
      return carrito.length;
    }

  return (
    <>
       <CartContext.Provider value={{carrito, cartClear, cartAdd, cartSub, itemsTotal}}>
            {children}
       </CartContext.Provider>
    </>
  )
}
