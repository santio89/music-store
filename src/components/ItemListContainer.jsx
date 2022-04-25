/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';
import { doc, setDoc, collection, getFirestore, getDocs } from 'firebase/firestore'


export default function ItemListContainer() {
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);

    const { categoryId } = useParams();
    const { searchId } = useParams();

    const discogsToken = "RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp";

    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);

        const hotSearch = "type=release&sort=hot%2Cdesc"
        const genreSearch = `genre=${categoryId}&type=release`;
        const manualSearch = `q=${searchId}&type=release`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);

        /* fetch custom con promise (hace el fetch a la api luego de un tiempo (lo dejo para apreciar el loading un poco) ) */
        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            /* res.results tiene los productos que devuelve la api. a partir de ahi creo/actualizo (con setDoc) mi base de datos en firebase. luego leo (con getDocs) desde firebase y seteo el array de productos para mostrar en pantalla. dejo los id de firebase para mantener mas consistencia (podria ser reemplazado por los id de firebase si quisiera) */
                       
                            /* busco en firebase los productos que la api diga para mostrar, y los seteo en el array de productos (si no existe en firebase, los crea). si la api no esta disponible (ej quota exceeded), muestro desde la api directamente para mantener el sitio activo.
                            creo el price en base a las propiedades community.have y community.want de la api. hago lo mismo para el stock.*/

                            /* const database = getFirestore();
                            const productsCollection = collection(database, "products");

                            let firebaseProducts = []
                            
                            getDocs(productsCollection, "products").then(results => {results.forEach(result => {
                                
                                res.results.forEach((r) => {
                                    
                                    r.price = Math.trunc(Math.abs((r.community?.have - r.community?.want) * .8 + 200));
                                    r.stock = Math.trunc(r.community.have / 40 + 12);

                                    if (r.id === result.data().id) {
                                        if (result.data().price !== r.price) {
                                            
                                            setDoc(doc(productsCollection, r.id.toString()), r, { merge: true });
                                        }

                                        firebaseProducts = [...firebaseProducts, result.data()]; 

                                    } else{
                                        setDoc(doc(productsCollection, r.id.toString()), r, { merge: true });
                                        firebaseProducts = [...firebaseProducts, r]; 
                                    }
                                })
                            }); setProductos(firebaseProducts); setLoading(false);}).catch(() => {
                                res.results.forEach((r) => {
                                    r.price = Math.trunc(Math.abs((r.community?.have - r.community?.want) * .8 + 200));
                                    r.stock = Math.trunc(r.community.have / 40 + 12);
                                });
                                setProductos(res.results); setLoading(false);
                            }); */

                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community?.have - r.community?.want) * .8 + 200));
                                r.stock = Math.trunc(r.community.have / 40 + 12);
                            });
                            setProductos(res.results); setLoading(false);


                        }
                    ).catch(err => { console.log("error: ", err) });
                } else {
                    navigate("./error404")
                }
            }
        ).catch(err => { console.log(err) });

    }, [categoryId, searchId, navigate])



    return (
        <ItemList productos={productos} categoryId={categoryId} searchId={searchId} loading={loading} />
    )
}