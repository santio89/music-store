import React, { useEffect, useState } from 'react';
import '../../src/styles/css/ItemListContainer.css';
import ItemDetail from './ItemDetail';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';



export default function ItemListContainer({cartAdd}){

    const { productId } = useParams();

    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState({});
    
    useEffect(()=>{
        /* api discogs - key/secret */
        setLoading(true);
        const key = "NzDEWGaaXPKwkGstTywu"
        const secret = "PpQhpcTuzerPMDEGRuwGfsmulqiIyBdJ"
        
        const fetchApi = fetch(`https://api.discogs.com/releases/${productId}?key=${key}&secret=${secret}`);
        
        /* fetch custom con promise (hace el fetch a la api luego de un tiempo) */
        customFetch(2000, fetchApi).then(
            res=>{
                res.json().then(
                    res=>{
                        console.log(res)
                        setProducto(res);
                        setLoading(false);
                    }
                )
            }
        ).catch(err=>{console.log(err)}) 
    }, [productId])

    return (
        <div className="ItemListContainer">
            {
                <ItemDetail producto={producto} loading={loading} cartAdd={cartAdd}/>
            }
            
        </div>
    )
}