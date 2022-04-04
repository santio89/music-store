/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import PuffLoader from "react-spinners/PuffLoader";


export default function ItemListContainer({cartAdd}){
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);
     
    useEffect(()=>{
        /* fetch en funcion async        
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

        setLoading(true);
        let fetchApi = fetch("https://api.discogs.com/database/search?type=release&sort=hot%2Cdesc&token=RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp");

        /* fetch custom con promise (hace el fetch a la api luego de un tiempo) */
        customFetch(2000, fetchApi).then(
            res=>{
                res.json().then(
                    res=>{
                        setProductos(res.results);
                        setLoading(false);
                    }
                )
            }
        ).catch(err=>{console.log(err)}) 

    }, [])
     
    return (
        <div className="ItemListContainer">
            {
                loading ? <PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} /> : <ItemList productos={productos} cartAdd={cartAdd}/>
            }
            
        </div>
    )
}