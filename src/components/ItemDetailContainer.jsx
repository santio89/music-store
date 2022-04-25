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


        /*  actualizo los datos de mi base de datos, mas especificamente del producto que se quiera ver. al utilizar la key/secret que me provee la api, puedo acceder a algunos datos más */
        customFetch(400, fetchApi).then(
            res => {
                res.json().then(
                    res => {
                        res.price = Math.trunc(Math.abs((res.community.have / res.community.want) * 1.8) + ((res.community.want / res.community.have) * .8) + 120) * 12;

                        /* actualizo data con mas info gracias al single search autentificado en la api */
                        setDoc(doc(productsCollection, res.id.toString()), res, { merge: true })

                        /* busco el producto en la base de datos de firebase primero y, si no esta disponible, muestro desde la api (para mantener el sitio activo, en caso de exceder la quota por ej)*/
                        getDoc(productRef).then(snapshot => {
                            if (snapshot.exists()) {
                                /* si no tiene la propiedad stock, la crea. por tanto, si hay stock en firebase, no lo actualizo desde la api (a no ser q sea 0, entonces restockea) */
                                if (!snapshot.data().stock) {
                                    res.stock = Math.trunc(res.community.have / 40 + 12);
                                    setDoc(doc(productsCollection, res.id.toString()), res, { merge: true });
                                    setProducto(res);
                                    setLoading(false);
                                } else {
                                    setProducto(snapshot.data());
                                    setLoading(false);
                                }
                            }
                        }).catch(() => { res.stock = Math.trunc(res.community.have / 40 + 12); setProducto(res); setLoading(false) })
                    }
                )
            }
        ).catch(err => { console.log("error: ", err) });

    }, [productId])

    return (

        <ItemDetail producto={producto} loading={loading} />

    )
}