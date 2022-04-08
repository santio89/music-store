/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import { Link } from 'react-router-dom';
import '../styles/css/Item.css';

export default function Item({id, title, img, stockInitial, price}){
     
const initial = 0;
stockInitial = Math.trunc(stockInitial/40); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (más rapidamente) */


    return(
        <>
            <div className="Item">
                <div className="Item__imgWrapper"><img className="Item__img" src={img} alt={"cover_image_"+id}></img></div>
                <div className="Item__content">
                    <p className="Item__content__price">${price}</p>
                    <h3 className="Item__content__title">{title}</h3>
                </div>
                <Link to={`/item/${id}`} className="Item__details">Detalles</Link>
            </div>
            
        </>
    )
}