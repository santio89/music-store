import React, { createContext, useState } from 'react'

export const Context = createContext();

export default function ContextProvider({children}) {

    const [carrito, setCarrito] = useState([]);


    const cartAdd = (item)=>{
        
        setCarrito((carrito)=>[...carrito, {item}])
    }

  return (
    <>
       <Context.Provider value={{carrito, cartAdd}}>
            {children}
       </Context.Provider>
    </>
  )
}
