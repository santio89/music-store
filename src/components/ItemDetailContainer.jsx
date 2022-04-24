import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';
import { doc, setDoc, getDoc, collection, getFirestore } from 'firebase/firestore'


export default function ItemDetailContainer() {
    const { productId } = useParams();

    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState({});

    useEffect(() => {
        setLoading(true);

        /* api discogs - key/secret */
        const key = "NzDEWGaaXPKwkGstTywu";
        const secret = "PpQhpcTuzerPMDEGRuwGfsmulqiIyBdJ";

        const fetchApi = fetch(`https://api.discogs.com/releases/${productId}?key=${key}&secret=${secret}`);

        const database = getFirestore();
        const productRef = doc(database, "products", productId);
        const productsCollection = collection(database, "products");

       /*  fetch custom con promise (hace el fetch a la api luego de un tiempo). 
       luego actualizo los datos de mi base de datos mas especificamente del producto que se quiera ver. al utilizar la key/secret que me provee la api, puedo acceder a algunos datos más */
         customFetch(400, fetchApi).then(
             res => { 
                 res.json().then( 
                     res => { 
                        setDoc(doc(productsCollection, res.id.toString()), res, { merge: true })

                        setProducto(res); 
                        setLoading(false); 
                     } 
                 ) 
             } 
         ).catch(err => { console.log(err) }); 


        /* busco el producto en la base de datos de firebase */
        getDoc(productRef).then(snapshot=>{
            if(snapshot.exists()){
                setProducto(snapshot.data());
                setLoading(false);
            }
        })

    }, [productId])

    return (

        <ItemDetail producto={producto} loading={loading} />

    )
}