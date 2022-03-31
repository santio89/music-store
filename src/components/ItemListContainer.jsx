import React from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemCount from './ItemCount';

export default function ItemListContainer(){


        
    
/*     function onAdd(cuanto){

    } */

    return (
        <div className="ItemListContainer">
            <ItemCount />
            {/* ItemCount onAdd={onAdd} desde= , hasta=   seria el container de los botones*/}
        </div>
    )
}