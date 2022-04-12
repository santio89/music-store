/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from 'react-router-dom';
import '../styles/css/Item.css';

export default function Item({id, title, img, price}){
     

    return(
        <>  
            <Link to={`/item/${id}`} className="ItemLink" onClick={()=>window.scrollTo(0,0)}>
                <div className="Item">
                    <div className="Item__imgWrapper"><img className="Item__img" src={img} alt={"cover_image_"+id}></img></div>
                    <div className="Item__content">
                        <p className="Item__content__price">${price}</p>
                        <h3 className="Item__content__title">{title}</h3>
                    </div>
                    <div className="Item__details">Detalles</div>
                </div>
            </Link>
        </>
    )
}