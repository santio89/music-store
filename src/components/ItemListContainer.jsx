import React, { useState } from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemCount from './ItemCount';
import { useCart } from './CartWidget'

export default function ItemListContainer(){
    
    /* esto deberia ir en un componente item */
    const {_ignore, cartAdd} = useCart();
    const initial = 0;
    const stockInitial = 10

    const [stock, stockMinus] = useState(stockInitial);

    function onAdd(ammount, resetCounter){
        console.log(`ADDED ${ammount} TO CART`)
        stockMinus(stock-ammount);
        resetCounter();
        cartAdd(ammount);
    }
    
    function failToAdd(){
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }

    /*  */

    return (
        <div className="ItemListContainer">
            <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>
            <div style={{textAlign: "center", marginTop: "2%", marginBottom: "2%", fontSize: "2em"}}>Stock: {stock}</div>
        </div>
    )
}