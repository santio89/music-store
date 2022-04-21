import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion, animatePresente, AnimatePresence } from 'framer-motion';
import Item from './Item'
import '../../src/styles/css/ItemList.css';
import PuffLoader from "react-spinners/PuffLoader";

export default function ItemList({productos, categoryId, searchId, loading}){
    
    /* price calculado con una formula a partir de las propiedades de 'community have' y 'community want', ya que la base de datos original no incluye precio. por el momento invente esta formula teniendo en cuenta la 'oferta/demanda' para calcular un precio */
    
    const [isProductos, setIsProductos] = useState(false);

    useEffect(()=>{
        productos.length>0?setIsProductos(true):setIsProductos(false);

    }, [productos])

    return (
        <>
            <div className="ItemListWrapper">
                
                {   
                    loading ? (<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />) :
                    <AnimatePresence>
                        <motion.div transition={{ type: 'spring', duration: 1 }} key="ItemList" className="ItemList" 
                        initial={{opacity: 0, transform: "translateX(-120%)"}} 
                        animate={{opacity: 1,transform: "translateX(0%)"}} 
                        exit={{opacity: 0, transform: "translateX(120%)"}}>
                        {searchId?<div className='ItemList__title'>BUSCANDO: {(searchId.replace(/\+/g, " ").toUpperCase())}</div>:(categoryId?<div className='ItemList__title'>VIENDO: {(categoryId.replace(/\+/g, " ").toUpperCase())}</div>:null)}
                        {isProductos?null:<div className="ItemList__noProducts">No se encontraron resultados... <Link className="ItemList__noProducts__link" to="/">Ir al inicio?</Link></div>}
                        <div className="ItemList__content">
                            {productos.map((producto)=>{
                                return(
                                    <Item key={producto.id} id={producto.id} title={producto.title} img={producto.cover_image} stockInitial={producto.community?.have} price={Math.trunc(Math.abs((producto.community?.have - producto.community?.want) * .8 + 200))} />
                                )
                            })}
                        </div>
                        </motion.div>
                    </AnimatePresence>
                }
                
            </div>
        </>
    )
}