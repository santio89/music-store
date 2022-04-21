import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

export default function CartContextProvider({children}) {

    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("msShopList")) || []);
    const [cartItems, setCartItems] = useState(0);
    const [total, setTotal] = useState(0);

    const cartAdd = (item)=>{
      const itemIndex = carrito.findIndex(producto=>producto.item.id === item.id);
      if(itemIndex !== -1){
        const newCart = [...carrito];
        newCart[itemIndex].item.count += item.count;
        setCarrito(newCart);
      } else{
        setCarrito([...carrito, {item}])
      }
    }

    const modifyCount = (item)=>{
      const itemIndex = carrito.findIndex(producto=>producto.item.id === item.id);
      if(itemIndex !== -1){
        const newCart = [...carrito];
        newCart[itemIndex].item.count = item.count;
        setCarrito(newCart);
      } else{
        setCarrito([...carrito, {item}])
      }
    }

    const cartRemove = (id)=>{
      setCarrito(carrito.filter(item=> item.item.id !== id));
     
    }

    const cartClear = ()=>{
      setCarrito([]);
    }

    const idCount = (id)=>{
      for (let item of carrito){
        if (item.item.id === id){
          return item.item.count;
        } 
      }
      return 0;
    }

    useEffect(()=>{

      const checkStorage = (e)=>{
        const {key, newValue} = e;
        
        if (key==="msShopList"){
          setCarrito(JSON.parse(newValue));
        }
      }

      window.addEventListener("storage", checkStorage)

      return (()=>window.removeEventListener("storage", checkStorage))
    })

    useEffect(()=>{
      setCartItems(carrito.reduce((total, item)=>total+=item.item.count, 0));
      
      setTotal(carrito.reduce((total, item)=>total+=item?.item?.precio * item?.item?.count, 0));

      localStorage.setItem("msShopList", JSON.stringify(carrito));
    }, [carrito])


  return (
    <>
       <CartContext.Provider value={{carrito, cartItems, total, cartClear, cartAdd, cartRemove, modifyCount, idCount}}>
            {children}
       </CartContext.Provider>
    </>
  )
}
