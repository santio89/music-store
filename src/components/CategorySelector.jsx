/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import '../../src/styles/CategorySelector.css';

export default function CategorySelector(){
    return(
        <div className="tabs is-medium">
            <ul className="is-size-5-widescreen is-size-6-desktop is-size-5-touch">
                <li className="is-active"><a tabIndex="0">Categorías</a></li>
                <li><a tabIndex="0">Más Vistos</a></li>
            </ul>
        </div>
    )
}