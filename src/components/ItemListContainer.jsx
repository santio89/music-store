import React from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemCount from './ItemCount';


export default function ItemListContainer(){
    const initial = 0;
    const stock = 10;

    function onAdd(ammount, resetCounter){
        console.log(`ADDED ${ammount} TO CART`)
        resetCounter();
    }
    function failToAdd(){
        console.log("FAIL TO ADD");
    }

    return (
        <div className="ItemListContainer">
            <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>
            <div style={{textAlign: "center", marginTop: "2%", marginBottom: "2%", fontSize: "2em"}}>Stock Inicial: {stock}</div>
        </div>
    )
}