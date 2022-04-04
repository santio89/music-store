/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import ItemCount from './ItemCount';
import '../styles/css/Item.css';

export default function Item({id, title, img, stockInitial, price, cartAdd}){
     
const initial = 0;
stockInitial = Math.trunc(stockInitial/40); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (mas rapidamente) */

const [stock, stockMinus] = useState(stockInitial);

function onAdd(amount, resetCounter){
    console.log(`ADDED ${amount} TO CART`)
    stockMinus(stock-amount);
    resetCounter();
    cartAdd(amount);
}

function failToAdd(){
    console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
}

    return(
        <>
            <div className="Item">
                <div className="Item__imgWrapper"><img className="Item__img" src={img} alt={"cover_image_"+id}></img></div>
                <div className="Item__content">
                    <p className="Item__content__price">${price}</p>
                    <h3 className="Item__content__title">{title}</h3>
                </div>
                <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>           
            </div>
            
        </>
    )
}