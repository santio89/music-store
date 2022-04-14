import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';
import CartWidget from './CartWidget';
import '../../src/styles/css/ItemDetail.css';

export default function ItemDetail({loading, producto, cartAdd, cartNumber}) {
    producto.precio = Math.trunc(Math.abs((producto.community?.have - producto.community?.want) * .8 + 200))
    producto.stockInitial = producto.community?.have;

    const initial = 0;
    producto.stockInitial = Math.trunc(producto.stockInitial/40); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (mas rapidamente) */

    const history = useNavigate();

    const [stock, setStock] = useState(0);

    useEffect(()=>{
        setStock(producto.stockInitial)
    }, [producto.stockInitial])
 
    
    function onAdd(amount){
        console.log(`ADDED ${amount} TO CART`)
        setStock(stock-amount);
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
                    <button onClick={()=>{history(-1)}} className='ItemDetail__back'>&#x21E0;&nbsp;Volver</button>
                    <div className='ItemDetail__body'>
                        <div className='ItemDetail__imgWrapper'>
                            <img alt="item" src={producto && producto.images && producto.images[0] && producto.images[0].resource_url}></img>
                        </div>
                        <div className="ItemDetail__info">
                            <p className='ItemDetail__subtitle'>{producto.artists_sort}</p>
                            <h2 className='ItemDetail__title'>{producto.title?.toUpperCase()}</h2>
                            <p>◖Géneros: {producto.genres?.join(" - ")}</p>
                            <p>◖Año: {producto.year}</p>
                            <p>◖País: {producto.country}</p>
                            <p>◖Sello: {producto.labels?.[0].name}</p>
                            <p>◖Formato: {producto.formats?.[0].name}</p>   
                            
                            <div className='ItemDetail__counterWrapper'>
                                <p className='ItemDetail__counterWrapper__price'>{"$"+producto.precio}</p>
                                <div className="ItemDetail__counterWrapper__counter">
                                    <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={stock}/>
                                    
                                    <div className='ItemDetail__checkout'>
                                        <CartWidget disabled={cartNumber>0?false:true} cartNumber={"Ir al checkout"} />
                                        <Link to="/" onClick={()=>{window.scrollTo(0,0)}} className='ItemDetail__checkout__continue'>Seguir Comprando</Link>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    )
}
