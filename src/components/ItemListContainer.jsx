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

/* 
    manual sort para pagina de resultados actual

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
            return (b.community.want - a.community.want)
        })

        setProductos(productos);
        setSortOpen(false);
    } */

    const sortAllLow = ()=>{
        setPaginationLoading(true);

        const hotSearch = "type=release&sort=have&sort_order=asc"
        const genreSearch = `genre=${categoryId}&type=release&sort=have&sort_order=asc`;
        const manualSearch = `q=${searchId}&type=release&sort=have&sort_order=asc`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);

        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            console.log(res)
                            setPaginationObject(res.pagination);        
                            setSortActive("low");
                            
                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community.have/20) * 1.2) + ((r.community.have / (r.community.have + 20)) * 1.2) + 1200);
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
    const sortAllHigh = ()=>{
        setPaginationLoading(true);
        
        const hotSearch = "type=release&sort=have&sort_order=desc"
        const genreSearch = `genre=${categoryId}&type=release&sort=have&sort_order=desc`;
        const manualSearch = `q=${searchId}&type=release&sort=have&sort_order=desc`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);

        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            setPaginationObject(res.pagination);        
                            setSortActive("high");
                            
                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community.have/20) * 1.2) + ((r.community.have / (r.community.have + 20)) * 1.2) + 1200);
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
    const sortAllRelevance = ()=>{
        setPaginationLoading(true);

        const hotSearch = "type=release&sort=want&sort_order=desc"
        const genreSearch = `genre=${categoryId}&type=release&sort=want&sort_order=desc`;
        const manualSearch = `q=${searchId}&type=release&sort=want&sort_order=desc`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);

        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            setPaginationObject(res.pagination);        
                            setSortActive("relevance");
                            
                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community.have/20) * 1.2) + ((r.community.have / (r.community.have + 20)) * 1.2) + 1200);
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
                                r.price = Math.trunc(Math.abs((r.community.have/20) * 1.2) + ((r.community.have / (r.community.have + 20)) * 1.2) + 1200);
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
        const genreSearch = `genre=${categoryId}&type=release&sort=want`;
        const manualSearch = `q=${searchId}&type=release&sort=want`

        let fetchApi = fetch(`https://api.discogs.com/database/search?${searchId ? manualSearch : (categoryId ? genreSearch : hotSearch)}&token=${discogsToken}`);

        
        /* desde la api, hago las busqedas de lista (para mantener los resultados más dinámicos que si los trajera de firebase). luego en el detalle de compra, actualizo mi base de datos en firebase (desde firebase tambien manejo stock por ej). si un item no existe, lo crea; si hay que actualizar precio. */

        /* fetch custom con promise (hace el fetch a la api luego de un tiempo (lo dejo para apreciar el loading un poco) ) */
        customFetch(400, fetchApi).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        res => {
                            setPaginationObject(res.pagination);
                            setSortActive("relevance");
                            
                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community.have/20) * 1.2) + ((r.community.have / (r.community.have + 20)) * 1.2) + 1200);

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
        <ItemList productos={productos} categoryId={categoryId} searchId={searchId} loading={loading} sortOpen={sortOpen} setSortOpen={setSortOpen} sortActive={sortActive} setSortActive={setSortActive} pagination={paginationObject} paginationFetch={paginationFetch} paginationLoading={paginationLoading} sortAllLow={sortAllLow} sortAllHigh={sortAllHigh} sortAllRelevance={sortAllRelevance} />
    )
}