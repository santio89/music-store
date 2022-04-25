/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/css/ItemList.css';
import ItemList from './ItemList';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom';


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
                            res.results.forEach((r) => {
                                r.price = Math.trunc(Math.abs((r.community?.want / r.community?.have) * 4 + (r.community.want - r.community.have)));
                                r.stock = Math.trunc(r.community.have / 40 + 12);


                               /*  ESTE CODIGO ES PARA ESCRIBIR LOS RESULTADOS DE LA API EN FIREBASE. lo desactivo de momento ya que resulta en muchas lecturas/escrituras innecesarias en firebase (se ejecutaria cada vez que se cargue la lista. esta bueno para ir cargando la base de datos inicial)

                                const database = getFirestore();
                                const productsCollection = collection(database, "products");
                                setDoc(doc(productsCollection, r.id.toString()), r, { merge: true }) */
  
                            });
                            setProductos(res.results);
                            setLoading(false);
                        }
                    ).catch(err => { console.log("error: ", err) });
                } else {
                    navigate("./error404")
                }
            }
        ).catch(err => { console.log(err) });

        /*  ESTE CODIGO ES PARA LEER DESDE FIREBASE y mostrar esos resultados en pantalla (en vez de mostrar los resultados de la api). Lo dejo desactivado ya que prefiero mostrar de la api los resultados de la lista (de esta forma es mas dinamico ya que la api continua agregando discos). De todas formas, al abrir un item (en item detail), el mismo se agrega o actualiza tambien a mi base de datos en firebase (pero manteniendo el stock de firebase, si hubiera)

        const database = getFirestore();
        const productsCollection = collection(database, "products");

        let firebaseProducts = []
        
        const hotSearchQuery = query(productsCollection, orderBy("community.want", "desc"), limit(50));
        getDocs(hotSearchQuery).then(snapshot=>{
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data())
                firebaseProducts = [...firebaseProducts, doc.data()]
            });
            setProductos(firebaseProducts); setLoading(false);
        }) */

    }, [categoryId, searchId, navigate])



    return (
        <ItemList productos={productos} categoryId={categoryId} searchId={searchId} loading={loading} />
    )
}