import React, { createContext, useState } from 'react'

export const Context = createContext();

export default function ContextProvider({children}) {

    const [carrito, setCarrito] = useState([]);


    const cartAdd = (amount, item)=>{
  
      setCarrito([...carrito, {item}])
    }

    const cartSub = (id)=>{
      
      setCarrito(carrito=>{carrito.filter(item=>item.id!==id)})
    }

    const itemsTotal = ()=>{
      return carrito.length;
    }

  return (
    <>
       <Context.Provider value={{carrito, cartAdd, itemsTotal}}>
            {children}
       </Context.Provider>
    </>
  )
}
