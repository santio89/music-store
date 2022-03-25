import React from "react";
import '../../src/styles/css/ItemListContainer.css';

export default function ItemListContainer({greetings}){
    return (
        <div className="ItemListContainer">
            {greetings}
        </div>
    )
}