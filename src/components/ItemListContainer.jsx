/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import PuffLoader from "react-spinners/PuffLoader";
import { useParams } from 'react-router-dom';


export default function ItemListContainer(){
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);
    
    const { categoryId } = useParams();
    const discogsToken = "RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp";

    const { searchId } = useParams();
    
    
    useEffect(()=>{     
        const hotSearch = "type=release&sort=hot%2Cdesc"
        const genreSearch = `genre=${categoryId}&type=release`;
        const manualSearch = `q=${searchId}&type=release`
        
        setLoading(true);
        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId?manualSearch:(categoryId?genreSearch:hotSearch)}&token=${discogsToken}`);
        
        /* fetch custom con promise (hace el fetch a la api luego de un tiempo) */
        customFetch(1000, fetchApi).then(
            res=>{
                res.json().then(
                    res=>{
                        setProductos(res.results);
                        setLoading(false);
                    }
                )
            }
        ).catch(err=>{console.log(err)}) 
    }, [categoryId, searchId])
     
    return (
        <div className="ItemListWrapper">

            {
                loading ? <PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} /> : <ItemList productos={productos} categoryId={categoryId} searchId={searchId}/>
            }
            
        </div>
    )
}