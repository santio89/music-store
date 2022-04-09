import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';
import '../../src/styles/css/ItemDetail.css';

export default function ItemDetail({loading, producto, cartAdd}) {
    producto.precio = Math.trunc(Math.abs((producto.community?.have - producto.community?.want) * .8 + 200))
    producto.stockInitial = producto.community?.have;

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
        cartAdd(amount);
    }

    function failToAdd(){
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }


    return (
    <>  
    
        <div className='ItemDetailWrapper'>
            {
            loading?<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />:(
                <div className='ItemDetail'>
                    <Link to="/" className='ItemDetail__back'>&#x21E0;&nbsp;Volver</Link>
                    <div className='ItemDetail__body'>
                        <div className='ItemDetail__imgWrapper'>
                            <img alt="item" src={producto && producto.images && producto.images[0] && producto.images[0].resource_url}></img>
                        </div>
                        <div className="ItemDetail__info">
                            <p className='ItemDetail__subtitle'>{producto.artists_sort}</p>
                            <h2 className='ItemDetail__title'>{producto.title?.toUpperCase()}</h2>
                            {/* <p>◖Artista: {producto.artists_sort}</p>
                            <p>◖Título: {producto.title}</p> */}
                            <p>◖Categorías: {producto.genres?.join(" - ")}</p>
                            <p>◖Año: {producto.year}</p>
                            <p>◖País: {producto.country}</p>
                            <p>◖Precio: {"$"+producto.precio}</p>
                            <div className='ItemDetail__counterWrapper'>
                            <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    )
}
