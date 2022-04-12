import React, { useState } from "react"
import '../../src/styles/css/SearchBar.css';
import { Link, useNavigate } from 'react-router-dom'

export default function SearchBar (){

    const [search, setSearch] = useState("");

    const navigate = useNavigate();


    const handleSearch = (e)=>{
        setSearch(e.target.value);

        if (e.keyCode===13){
            if (search){
                window.scrollTo(0,0);
                e.target.value="";
                navigate("/search/"+search);
            } else{
                return;
            }
            
        }
        
    }


    return(
        <div className="navbar-item searchBar__wrapper">
            <div className="searchBar">
                <input type="text" placeholder="Buscar" className="searchBar__input" onKeyUp={handleSearch}></input>
                <Link to={"/music-store/search/"+search} onClick={e=>search?window.scrollTo(0,0):e.preventDefault()} className="searchBar__icon"><i className="bi bi-search"></i></Link>
            </div>
    </div>
    )
}