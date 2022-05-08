/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';


export default function ItemListContainer() {
    const [loading, setLoading] = useState(false);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [productos, setProductos] = useState([]);

    const { categoryId } = useParams();
    const { searchId } = useParams();

    const discogsToken = "RkqSJrgChJCPUvsaYEUrkgTSzPgnYlXzVEOZiwnp";

    const navigate = useNavigate();

    const [ sortOpen, setSortOpen ] = useState(false);
    const [ sortActive, setSortActive ] = useState("relevance");

    const [paginationObject, setPaginationObject] = useState({});


    const sortLow = ()=>{
        productos.sort((a,b)=>{
            return (a.price - b.price)
        })
        
        setProductos(productos);
        setSortOpen(false);
    }
    const sortHigh = ()=>{
        productos.sort((a,b)=>{
            return (b.price - a.price)
        })
        
        setProductos(productos);
        setSortOpen(false);
    }
    const sortRelevance = ()=>{
        productos.sort((a,b)=>{
            return (b.community.have - a.community.have)
        })

        setProductos(productos);
        setSortOpen(false);
    }


    const paginationFetch = (paginationUrl)=>{
        setPaginationLoading(true);
        let fetchApi = fetch(paginationUrl);

        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            setPaginationObject(res.pagination);        
                            setSortActive("relevance");
                            
                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community.have / r.community.want) * 1.8) + ((r.community.want / (r.community.have + 1)) * .8) + 120) * 12;
                            });
                            setProductos(res.results);
                            setPaginationLoading(false);
                        }
                    ).catch(() => {setPaginationLoading(false)});
                } else {
                    navigate("./error404")
                }
            }
        ).catch(() => {setPaginationLoading(false)})
    }


    useEffect(() => {
        setLoading(true);

        const hotSearch = "type=release&sort=want"
        const genreSearch = `genre=${categoryId}&type=release`;
        const manualSearch = `q=${searchId}&type=release`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);

        
        /* desde la api, hago las busqedas de lista (para mantener los resultados más dinámicos que si los trajera de firebase). luego en el detalle de compra, actualizo mi base de datos en firebase (desde firebase tambien manejo stock por ej). si un item no existe, lo crea; si hay que actualizar precio. */

        /* fetch custom con promise (hace el fetch a la api luego de un tiempo (lo dejo para apreciar el loading un poco) ) */
        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            setPaginationObject(res.pagination);

                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community.have / r.community.want) * 1.8) + ((r.community.want / (r.community.have + 1)) * .8) + 120) * 12;

                                /* ESTE CODIGO ES PARA ESCRIBIR ESTOS RESULTADOS DE LA API, EN FIREBASE. lo desactivo de momento ya que resulta en muchas lecturas/escrituras innecesarias (se ejecutaria cada vez que se cargue la lista. esta bueno para cargar la base de datos inicial)

                                const database = getFirestore();
                                const productsCollection = collection(database, "products");
                                setDoc(doc(productsCollection, r.id.toString()), r, { merge: true });
                                */

                            });
                            setProductos(res.results);
                            setLoading(false);
                        }
                    ).catch(err => { console.log("error fetching data: ", err) });
                } else {
                    navigate("./error404")
                }
            }
        ).catch(err => { console.log("error fetching data: ", err) })
            
        /*  
            FIREBASE - QUERY FILTRADA
            const database = getFirestore();
            const productsCollection = collection(database, "products");
            let firebaseProducts = []

            const hotSearchQuery = query(productsCollection, orderBy("community.have", "desc"), limit(50));
            getDocs(hotSearchQuery).then(snapshot => {
                snapshot.docs.forEach((doc) => {
                    firebaseProducts = [...firebaseProducts, doc.data()]
                });
                console.log(firebaseProducts);
                setProductos(firebaseProducts); setLoading(false);
            }); */
        
    }, [categoryId, searchId, navigate])



    return (
        <ItemList productos={productos} categoryId={categoryId} searchId={searchId} loading={loading} sortOpen={sortOpen} setSortOpen={setSortOpen} sortLow={sortLow} sortHigh={sortHigh} sortRelevance={sortRelevance} sortActive={sortActive} setSortActive={setSortActive} pagination={paginationObject} paginationFetch={paginationFetch} paginationLoading={paginationLoading} />
    )
}