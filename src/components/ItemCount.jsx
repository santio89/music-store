import React, { useState, useContext, useEffect }  from "react";
import { CartContext } from "../Context/CartContext";
import '../styles/css/ItemCount.css';



const useCounter = (initial)=>{
    /* pasar un callback a useState hace que el estado inicial sea seteado solo una vez y no cada vez que se renderize el elemento. es mas util si tuviera calculos complejos que realizar para un estado inicial */
    const [ counter, setCounter] = useState(()=>{return initial});

    /* pasar un callback a setCounter es recomendable cuando quiero operar basado en el valor anterior */
    const increase = ()=>{setCounter((counter)=> counter + 1 )}; 
    const decrease = ()=>{setCounter((counter)=> counter - 1 )};
    const reset = ()=>{setCounter(1)};

    return{ 
        counter,
        increase,
        decrease,
        reset
    }
}


export default function ItemCount({onAdd, failToAdd, initial, stock, id}) {
    let {counter, increase, decrease, reset} = useCounter(initial);
    const [inCart, setInCart] = useState(0);
    const {idCount} = useContext(CartContext);
    
    useEffect(()=>{
        setInCart(idCount(id))
    }, [idCount, id])
    
    
    return(
        <div className="ItemCount">
            <div className="ItemCount__buttons">
                <button className="ItemCount__buttons__decrease" onClick={counter>1?decrease:null}>-</button>
                <div className="ItemCount__buttons__number">{counter}</div>
                <button className="ItemCount__buttons__increase" onClick={counter>stock?null:(counter+idCount(id)<stock?increase:null)}>+</button>
            </div>
            
            <button disabled={counter+idCount(id)<=stock?false:true} className="ItemCount__add" onClick={counter===0?null:(counter>stock?failToAdd:()=>{onAdd(counter); reset();})}>Agregar al carrito</button>

            <div className="ItemCount__stock"><span>Stock: {stock}</span><span>Carrito: {inCart}</span></div>
        </div>
    )
}