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
                        console.log(res)
                        res.price = Math.trunc(Math.abs((res.community?.have - res.community?.want) * .8 + 200));
                        res.stock = Math.trunc(res.community.have / 40 + 12);
                        /* actualizo data con mas info gracias al single search autentificado en la api */
                        setDoc(doc(productsCollection, res.id.toString()), res, { merge: true })

                        /* busco el producto en la base de datos de firebase primero y, si no esta disponible, muestro desde la api (para mantener el sitio activo)*/
                        getDoc(productRef).then(snapshot => {
                            if (snapshot.exists()) {
                                setProducto(snapshot.data());
                                setLoading(false);
                            }
                        }).catch(() => { setProducto(res); setLoading(false) })
                    }
                )
            }
        ).catch(err => { console.log("error: ", err) });

    }, [productId])

    return (

        <ItemDetail producto={producto} loading={loading} />

    )
}