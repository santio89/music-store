import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';
import { doc, setDoc, getDoc, collection, getFirestore } from 'firebase/firestore'


export default function ItemDetailContainer() {
    const { productId } = useParams();

    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState({});

    const [spotifyId, setSpotifyId] = useState(" ");

    useEffect(() => {
        setLoading(true);

        /* api discogs - key/secret */
        const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
        const discogsSecret = process.env.REACT_APP_DISCOGS_SECRET;

        const fetchApi = fetch(`https://api.discogs.com/releases/${productId}?key=${discogsKey}&secret=${discogsSecret}`);

        const database = getFirestore();
        const productRef = doc(database, "products", productId);
        const productsCollection = collection(database, "products");

        const spotifyId = process.env.REACT_APP_SPOTIFY_ID;
        const spotifySecret = process.env.REACT_APP_SPOTIFY_SECRET;
        const spotifyRefresh = process.env.REACT_APP_SPOTIFY_REFRESH;
        const spotifyToken = process.env.REACT_APP_SPOTIFY_TOKEN;

        /*Spotify Client ID cf9bd46107404be28e5f6ac908e9986b
         Spotify Client Secret 54285d7f09e6482f92050ce401bcabfd  */

        /*  fetch custom con promise (hace el fetch a la api luego de un tiempo). 
        luego actualizo los datos de mi base de datos mas especificamente del producto que se quiera ver. al utilizar la key/secret que me provee la api, puedo acceder a algunos datos más */
        customFetch(200, fetchApi).then(
            res => {
                res.json().then(
                    res => {
                        res.price = Math.ceil(Math.abs(100 + (res.community.have/4000)*1.56));

                        /* busco el producto en la base de datos de firebase primero y, si no esta disponible, muestro desde la api (para mantener el sitio activo)*/
                        getDoc(productRef).then(snapshot => {
                            if (snapshot.exists()) {
                                /* si no tiene la propiedad stock, la crea (o si es 0 la refresca). por tanto, si hay stock en firebase, no lo actualizo desde la api */

                                if (snapshot.data().stock && snapshot.data().stock > 0) {
                                    if (!snapshot.data().price || (snapshot.data().price !== res.price)) {
                                        /* seteo el precio si no existe o esta desactualizado */
                                        setDoc(doc(productsCollection, res.id.toString()), res, { merge: true })

                                        res.stock = snapshot.data().stock;
                                        setProducto(res);  /* dado que actualizo la base de datos en firebase (actualizo precio en este if) y esta operacion es async, voy a mostrar en pantalla el resultado de la api ya que el contenido es el mismo (a excepcion del stock, el cual traigo de firebase y muestro) y ya lo tengo disponible */
                                        setLoading(false);
                                    } else {
                                        setProducto(snapshot.data());
                                        setLoading(false);
                                    }
                                } else {
                                    res.stock = Math.ceil(res.community.have / 40 + 12);
                                    setDoc(doc(productsCollection, res.id.toString()), res, { merge: true })

                                    setProducto(res);
                                    setLoading(false);
                                }
                            } else {
                                res.stock = Math.ceil(res.community.have / 40 + 12);
                                setDoc(doc(productsCollection, res.id.toString()), res, { merge: true });
                                setProducto(res);
                                setLoading(false);
                            }
                        }).catch(() => {
                            res.stock = Math.ceil(res.community.have / 40 + 12);
                            setProducto(res);
                            setLoading(false)
                        })

                        /* fetch a spotify para conseguir una token temporaria, luego fetch para el tracklist */
                        fetch("https://accounts.spotify.com/api/token", {
                            body: `client_id=${spotifyId}&client_secret=${spotifySecret}&grant_type=refresh_token&refresh_token=${spotifyRefresh}`,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Authorization": `Basic ${spotifyToken}`
                            },
                            method: "POST"
                        }).then(response => {
                            response.json().then(response => {
                                /* fetching spotify - tracklist */
                                fetch(`https://api.spotify.com/v1/search?q=${res?.title}%20${res?.artists_sort}&type=album`, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: `Bearer ${response.access_token}`,
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => {
                                    res.json().then(res => {
                                        setSpotifyId(res?.albums?.items?.[0]?.id)
                                    })
                                }).catch(err => console.log("error fetching spotify: " + err));
                            })
                        })


                    }
                )


            }
        ).catch(err => { console.log("error: ", err) });

    }, [productId])

    return (

        <ItemDetail producto={producto} loading={loading} spotifyId={spotifyId} />

    )
}