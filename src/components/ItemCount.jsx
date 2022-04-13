import React, { useState }  from "react";
import '../styles/css/ItemCount.css';


const useCounter = (initial)=>{
    /* pasar un callback a useState hace que el estado inicial sea seteado solo una vez y no cada vez que se renderize el elemento. es mas util si tuviera calculos complejos que realizar para un estado inicial */
    const [ counter, setCounter] = useState(()=>{return initial});

    /* pasar un callback a setCounter es recomendable cuando quiero operar basado en el valor anterior */
    const increase = ()=>{setCounter((counter)=> counter + 1 )}; 
    const decrease = ()=>{setCounter((counter)=> counter - 1 )};
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
            
            <button className="ItemCount__add" onClick={counter===0?null:(counter>stock?failToAdd:()=>{onAdd(counter); reset();})}>Agregar Items</button>

            <div className="ItemCount__stock">Stock: {stock}</div>
        </div>
    )
}