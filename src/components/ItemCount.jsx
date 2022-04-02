import React, { useState }  from "react";
import '../styles/css/ItemCount.css';


const useCounter = (initial)=>{
    const [x, setX] = useState(initial);
    
    const increase = ()=>{setX(x+1)};
    const decrease = ()=>{setX(x-1)};
    const reset = ()=>{setX(0)};

    return{ 
        x,
        increase,
        decrease,
        reset
    }
}


export default function ItemCount({onAdd, failToAdd, initial, stock}) {
    let {x, increase, decrease, reset} = useCounter(initial);
  
    return(
        <div className="ItemCount">
            <div className="ItemCount__buttons">
                <button className="ItemCount__buttons__decrease" onClick={x>0?decrease:null}>-</button>
                <div className="ItemCount__buttons__number">{x}</div>
                <button className="ItemCount__buttons__increase" onClick={stock>0?increase:null}>+</button>
            </div>
            
            <button className="ItemCount__add" onClick={x===0?null:(x>stock?failToAdd:()=>{onAdd(x, reset)})}>Agregar al carrito</button>

            <div className="ItemCount__stock">Stock: {stock}</div>
        </div>
    )
}