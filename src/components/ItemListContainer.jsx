/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemList from './ItemList';


export default function ItemListContainer(){
    
    const [productos, setProductos] = useState([]);
    
     
    useEffect(()=>{
        /*         
        async function apiTest(){
            try{
                const response = await fetch("https://api.discogs.com/database/search?q=NewReleases&token=RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp"); 
                const items = await response.json();

                setProductos(items.results)
            }
            catch (err){
                console.log(err);
            }
        
        }
        apiTest(); */

        fetch("https://api.discogs.com/database/search?type=release&sort=hot%2Cdesc&token=RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp").then(res=>{
            res.json().then(res=>setProductos(res.results))
            }).catch(err=>{console.log(err)}) 

    }, [])
     
    return (
        <div className="ItemListContainer">
            <ItemList productos={productos}/>
        </div>
    )
}