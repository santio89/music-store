import React, { useState }  from "react";
import '../styles/css/ItemCount.css';

export const useCounter = ()=>{
    const [x, setX] = useState(0);

    const increase = ()=>{setX(x+1)};
    const decrease = ()=>{setX(x-1)};

    return{ 
        x,
        increase,
        decrease
    }
}

const onAdd = (number)=>{

}


export default function ItemCount() {
    const {x, increase, decrease} = useCounter();

    return(
        <div className="ItemCount">
            <div className="ItemCount__buttons">
                <button className="ItemCount__buttons__decrease" onClick={decrease}>-</button>
                <div className="ItemCount__buttons__number">{x}</div>
                <button className="ItemCount__buttons__increase" onClick={increase}>+</button>
            </div>
            
            <button className="ItemCount__add">Agregar al carrito</button>
        </div>
    )
}