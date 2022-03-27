import React from "react"
import '../../src/styles/css/SearchBar.css';

export default function SearchBar (){
    return(
        <div className="navbar-item searchBar__wrapper">
            <div className="searchBar">
                <input type="text" placeholder="Buscar" className="searchBar__input"></input>
                <button className="searchBar__icon"><i className="bi bi-search"></i></button>
            </div>
    </div>
    )
}