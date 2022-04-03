import React, { useState }  from "react";
import '../styles/css/ItemCount.css';


const useCounter = (initial)=>{
    const [ counter, setCounter] = useState(initial);
    
    const increase = ()=>{setCounter(counter+1)};
    const decrease = ()=>{setCounter(counter-1)};
    const reset = ()=>{setCounter(0)};

    return{ 
        counter,
        increase,
        decrease,
        reset
    }
}


export default function ItemCount({onAdd, failToAdd, initial, stock}) {
    let {counter, increase, decrease, reset} = useCounter(initial);
  
    return(
        <div className="ItemCount">
            <div className="ItemCount__buttons">
                <button className="ItemCount__buttons__decrease" onClick={counter>0?decrease:null}>-</button>
                <div className="ItemCount__buttons__number">{counter}</div>
                <button className="ItemCount__buttons__increase" onClick={counter>stock-1?null:(stock>0?increase:null)}>+</button>
            </div>
            
            <button className="ItemCount__add" onClick={counter===0?null:(counter>stock?failToAdd:()=>{onAdd(counter, reset)})}>Agregar<br />al carrito</button>

            <div className="ItemCount__stock">Stock: {stock}</div>
        </div>
    )
}