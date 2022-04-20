import React, { useState, useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';
import CartWidget from './CartWidget';
import '../../src/styles/css/ItemDetail.css';

export default function ItemDetail({loading, producto}) {
    producto.precio = Math.trunc(Math.abs((producto.community?.have - producto.community?.want) * .8 + 200))
    producto.stockInitial = producto.community?.have;

    const initial = 1;
    producto.stockInitial = Math.trunc(producto.stockInitial/40 + 10); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (mas rapidamente) */

    const history = useNavigate();
/*     const [stock, setStock] = useState(0); */
    const [continueCheckout, setContinueCheckout] = useState(false);

    const {cartAdd} = useContext(CartContext)
    
    const onAdd=(count)=>{
    /*     setStock(stock-count); */
        setContinueCheckout(true);
        cartAdd({...producto, count});
    }

    const failToAdd=()=>{
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }

/*     useEffect(()=>{
        setStock(producto.stockInitial)
    }, [producto.stockInitial]) */


    return (
    <>  
    
        <div className='ItemDetailWrapper'>
            {
            loading?<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />:(
                <div className='ItemDetail'>
                    <button onClick={()=>{history(-1)}} className='ItemDetail__back'>&#x21E0;&nbsp;Volver</button>
                    <div className='ItemDetail__body'>
                        <div className='ItemDetail__imgWrapper'>
                            <img alt="item" src={producto && producto.images && producto.images[0] && producto.images[0].resource_url} loading="lazy"></img>
                            <div className='ItemDetail__pWrapper'>
                                    <p>◖Título: {producto.title}</p>
                                    <p>◖Artista: {producto.artists_sort}</p>
                                    <p>◖Género: {producto.genres?.join(" - ")}</p>
                                    <p>◖Año: {producto.year}</p>
                                    <p>◖País: {producto.country}</p>
                                    <p>◖Sello: {producto.labels?.[0].name}</p>
                                    <p>◖Formato: {producto.formats?.[0].name}</p>   
                            </div>
                        </div>
                        <div className="ItemDetail__infoWrapper">
                            <div className="ItemDetail__info">
                                <div className="ItemDetail__info__main">
                                    <p className='ItemDetail__subtitle'>{producto.artists_sort}</p>
                                    <h2 className='ItemDetail__title'>{producto.title?.toUpperCase()}</h2>
                                </div>

                                {continueCheckout?null:<div className='ItemDetail__counterWrapper'>
                                    <p className='ItemDetail__counterWrapper__price'>{"$"+producto.precio}</p>
                                    <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initial} stock={producto.stockInitial} id={producto.id}/>
                                
                                </div>}
                                
                                {continueCheckout?<div className='ItemDetail__checkout'>
                                            <h3>Productos agregados!</h3>
                                            <div className='ItemDetail__checkout__buttons'>
                                                <CartWidget message={"Ir al checkout"} />
                                                <button onClick={()=>{setContinueCheckout(false)}} className='ItemDetail__checkout__continue'>Seguir comprando</button>
                                            </div>
                                </div>:null}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    )
}
