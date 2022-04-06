import React, { useEffect, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';

export default function ItemDetail({producto}) {
    producto.precio = producto && producto.community && producto.community.have && producto.community.want && (Math.trunc(Math.abs((producto.community.have - producto.community.want) * .8 + 200)));
    producto.stockInitial = producto && producto.community && producto.community.have;

    const initial = 0;
    producto.stockInitial = Math.trunc(producto.stockInitial/40); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (mas rapidamente) */

    const [stock, setStock] = useState(0);

    useEffect(()=>{
        setStock(producto.stockInitial)
    }, [producto.stockInitial])
 
    
    function onAdd(amount, resetCounter){
        console.log(`ADDED ${amount} TO CART`)
        setStock(stock-amount);
        resetCounter();
    }

    function failToAdd(){
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }


    return (
    <>  

        <h2>{producto.title}</h2>
        <div className='ItemDetail__imgWrapper'><img alt="item" src={producto.cover_image}></img></div>
        <div className="ItemDetail__info">
            <p>Categorías: {producto?.style?.join(" - ")}</p>
            <p>Año: {producto.year}</p>
            <p>País: {producto.country}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stockInitial}</p>
        </div>
        <div className='ItemDetail__counterWrapper'>
            <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>
        </div>
    </>
    )
}
