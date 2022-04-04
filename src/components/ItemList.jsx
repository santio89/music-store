import React from "react";
import Item from './Item'
import '../../src/styles/css/ItemList.css';

export default function ItemList({productos, cartAdd}){
    
    console.log(productos)
    return (
        <>
            <div className="ItemList">
                {productos.map((producto)=>{
                    return(
                        <Item key={producto.id} id={producto.id} title={producto.title} img={producto.cover_image} stockInitial={producto.community.have} price={Math.trunc(Math.abs((producto.community.have - producto.community.want) * .8 + 200))} cartAdd={cartAdd}/>
                    )
                })}
                
            </div>
        </>
    )
}