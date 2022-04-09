/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import PuffLoader from "react-spinners/PuffLoader";
import { useParams } from 'react-router-dom';


export default function ItemListContainer({cartAdd}){
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);
    
    const { categoryId } = useParams();
    const discogsToken = "RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp";
    
    
    useEffect(()=>{     
        const hotSearch = "type=release&sort=hot%2Cdesc"
        
        const apiSearch = `genre=${categoryId}`;
        
        setLoading(true);
        let fetchApi = fetch(`https://api.discogs.com/database/search?${categoryId?apiSearch:hotSearch}&token=${discogsToken}`);
        
        /* fetch custom con promise (hace el fetch a la api luego de un tiempo) */
        customFetch(1000, fetchApi).then(
            res=>{
                res.json().then(
                    res=>{
                        console.log(res.results);
                        setProductos(res.results);
                        setLoading(false);
                    }
                )
            }
        ).catch(err=>{console.log(err)}) 
    }, [categoryId])
     
    return (
        <div className="ItemListWrapper">
            {
                loading ? <PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} /> : <ItemList productos={productos} cartAdd={cartAdd}/>
            }
            
        </div>
    )
}