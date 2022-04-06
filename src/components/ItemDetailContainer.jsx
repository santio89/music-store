import React, { useEffect, useState } from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemDetail from './ItemDetail';
import customFetch from '../utils/customFetch';



export default function ItemListContainer({cartAdd}){
    
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState([]);
    
    useEffect(()=>{
        setLoading(true);
        let fetchApi = fetch("https://api.discogs.com/database/search?type=release&sort=hot%2Cdesc&token=RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp");
        
        /* fetch custom con promise (hace el fetch a la api luego de un tiempo) */
        customFetch(2000, fetchApi).then(
            res=>{
                res.json().then(
                    res=>{
                        setProducto(res.results[1]);
                        setLoading(false);
                    }
                )
            }
        ).catch(err=>{console.log(err)}) 
    }, [])
     
    return (
        <div className="ItemListContainer">
            {
                <ItemDetail producto={producto} loading={loading}/>
            }
            
        </div>
    )
}