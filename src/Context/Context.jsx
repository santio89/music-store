import React, { createContext, useState } from 'react'

export const Context = createContext();

export default function ContextProvider({children}) {

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

    const itemsTotal = ()=>{
      return carrito.length;
    }

  return (
    <>
       <Context.Provider value={{carrito, cartAdd, cartSub, itemsTotal}}>
            {children}
       </Context.Provider>
    </>
  )
}
