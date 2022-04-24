/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';
import { doc, setDoc, writeBatch, collection, getFirestore, getDocs } from 'firebase/firestore'


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

                            const database = getFirestore();
                            const productsCollection = collection(database, "products");

                            const batch = writeBatch(database);
                            /* esta funcion actualiza la base de datos en firebase (actualiza los datos (merge) o crea si no existen) */
                            res.results.forEach((result)=>{
                                /* creo el price en base a las propiedades community.have y community.want de la api. hago lo mismo para el stock */
                                result.price=Math.trunc(Math.abs((result.community?.have - result.community?.want) * .8 + 200));
                                result.stock = Math.trunc(result.community.have / 40 + 12); /* disminuyo el stock solo a modo de que se pueda probar agotar el stock (mas rapidamente) */

                                setDoc(doc(productsCollection, result.id.toString()), result, { merge: true })
                            })


                            let firebaseProducts = []
                            getDocs(productsCollection, "products").then(results=>results.forEach(result=>{
                                /* busco en firebase los productos que la api diga para mostrar, y los seteo en el array de productos */
                                res.results.forEach((r)=>{
                                    if (result.data().id === r.id){ firebaseProducts = [...firebaseProducts, result.data()] }
                                })     

                                setProductos(firebaseProducts);
                                setLoading(false);
                            }));
                        }
                    )
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