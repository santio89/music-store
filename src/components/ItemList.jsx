import React from "react";
import Item from './Item'
import '../../src/styles/css/ItemList.css';

export default function ItemList({productos, categoryId}){
    
    /* price calculado con una formula a partir de las propiedades de 'community have' y 'community want', ya que la base de datos original no incluye precio. por el momento invente esta formula teniendo en cuenta la 'oferta/demanda' para calcular un precio */
   
    return (
        <>
            <div className="ItemList">
                {categoryId?<div className='ItemList__title'>VIENDO {(categoryId.replace(/\+/g, " ").toUpperCase())}</div>:null}
                <div className="ItemList__content">
                    {productos.map((producto)=>{
                        return(
                            <Item key={producto.id} id={producto.id} title={producto.title} img={producto.cover_image} stockInitial={producto.community.have} price={Math.trunc(Math.abs((producto.community.have - producto.community.want) * .8 + 200))}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}