import React from "react";
import '../../src/styles/CategorySelector.css';

export default function CategorySelector(){
    return(
        <div class="tabs is-medium">
            <ul className="is-size-5-widescreen is-size-6-desktop is-size-5-touch">
                <li class="is-active"><a>Categorías</a></li>
                <li><a>Más Vistos</a></li>
            </ul>
        </div>
    )
}