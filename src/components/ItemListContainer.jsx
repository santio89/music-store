/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';
import { getDocs, collection, getFirestore, query, orderBy, limit } from 'firebase/firestore'


export default function ItemListContainer() {
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);

    const { categoryId } = useParams();
    const { searchId } = useParams();

    const discogsToken = "RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp";

    const navigate = useNavigate();

    const [ sortOpen, setSortOpen ] = useState(false);
    const sortLow = ()=>{
        productos.sort((a,b)=>{
            return (a.price - b.price)
        })
        
        setProductos(productos);
        setSortOpen(false)
    }
    const sortHigh = ()=>{
        productos.sort((a,b)=>{
            return (b.price - a.price)
        })
        
        setProductos(productos);
        setSortOpen(false)
    }


    useEffect(() => {
        setLoading(true);

        const hotSearch = "type=release&sort=hot%2Cdesc"
        const genreSearch = `genre=${categoryId}&type=release`;
        const manualSearch = `q=${searchId}&type=release`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);


        /* fetch custom con promise (hace el fetch a la api luego de un tiempo (lo dejo para apreciar el loading un poco) ) */
        /* si es una busqueda manual o de categoria consulto api. else, muestro los mas visto desde firebase (seria la homepage) */
        if (categoryId || searchId) {
            customFetch(400, fetchApi).then(
                res => {
                    if (res.ok) {
                        res.json().then(
                            res => {
                                res.results.forEach((r) => {
                                    r.price = Math.trunc(Math.abs((r.community.have / r.community.want) * 1.8) + ((r.community.want / r.community.have) * .8) + 120) * 12;

                                    /* ESTE CODIGO ES PARA ESCRIBIR LOS RESULTADOS DE LA API, EN FIREBASE. lo desactivo de momento ya que resulta en muchas lecturas/escrituras innecesarias (se ejecutaria cada vez que se cargue la lista. esta bueno para cargar la base de datos inicial)
 
                                    const database = getFirestore();
                                    const productsCollection = collection(database, "products");
                                    setDoc(doc(productsCollection, r.id.toString()), r, { merge: true });
                                    */

                                });
                                setProductos(res.results);
                                setLoading(false);
                            }
                        ).catch(err => { console.log("error: ", err) });
                    } else {
                        navigate("./error404")
                    }
                }
            ).catch(err => { console.log(err) })
        } else {
            const database = getFirestore();
            const productsCollection = collection(database, "products");
            let firebaseProducts = []

            const hotSearchQuery = query(productsCollection, orderBy("community.want", "desc"), limit(50));
            getDocs(hotSearchQuery).then(snapshot => {
                snapshot.docs.forEach((doc) => {
                    firebaseProducts = [...firebaseProducts, doc.data()]
                });
                setProductos(firebaseProducts); setLoading(false);
            });
        }
    }, [categoryId, searchId, navigate])



    return (
        <ItemList productos={productos} categoryId={categoryId} searchId={searchId} loading={loading} sortOpen={sortOpen} setSortOpen={setSortOpen} sortLow={sortLow} sortHigh={sortHigh} />
    )
}