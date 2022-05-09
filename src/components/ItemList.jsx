import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Item from './Item'
import '../../src/styles/css/ItemList.css';
import PuffLoader from "react-spinners/PuffLoader";

export default function ItemList({ productos, searchId, loading, sortOpen, setSortOpen, sortActive, pagination, paginationFetch, paginationLoading, sortAllLow, sortAllHigh, sortAllRelevance }) {

    /*price calculado con una formula a partir de las propiedades de 'community have' y 'community want' (que vienen de la api) */

    const { categoryId } = useParams();
    const [isProductos, setIsProductos] = useState(false);

    const history = useNavigate();

    useEffect(() => {
        productos.length > 0 ? setIsProductos(true) : setIsProductos(false);

    }, [productos])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <>
            <AnimatePresence>
                <motion.div transition={{ type: 'spring', duration: .8 }} initial={{ opacity: 0, x: "-120%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "120%" }} key="ItemList__title__search" className='ItemList__title'>

                    {
                        searchId ? <div>BUSCANDO: {searchId.replace(/\+/g, " ").toUpperCase()}</div> : (categoryId ? (<div>VIENDO: <select name="categorias" defaultValue={categoryId} onChange={(e) => { history(`../categories/${e.target.value.replace(/\s/g, "+")}`) }}>
                            <option value={"categories"} disabled>CATEGORIAS</option>
                            <option value={"rock"}>ROCK</option>
                            <option value={"pop"}>POP</option>
                            <option value={"blues"}>BLUES</option>
                            <option value={"jazz"}>JAZZ</option>
                            <option value={"hip+hop"}>HIP HOP</option>
                            <option value={"reggae"}>REGGAE</option>
                            <option value={"electronic"}>ELECTRONIC</option>
                            <option value={"country"}>COUNTRY</option>
                            <option value={"classical"}>CLASSICAL</option>
                            <option value={"funk"}>FUNK</option>
                            <option value={"latin"}>LATIN</option>
                            <option value={"folk"}>FOLK</option>
                        </select></div>) : <div>MÁS VISTOS</div>)
                    }
                </motion.div>

            </AnimatePresence>

            <div className={`ItemListWrapper ${paginationLoading?"paginationLoading":""}`}>
                {
                    loading ? (<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />) :
                        <AnimatePresence>
                            <motion.div transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} key="ItemList" className="ItemList"
                                initial={{ opacity: 0, x: "-120%" }}
                                animate={{ opacity: 1, x: "0%" }}
                                exit={{ opacity: 0, x: "120%" }}>
                                    
                                {isProductos ? <div className="ItemList__contentWrapper">
                                    <div className="ItemList__sortWrapper">
                                        <button className={`ItemList__sort ${sortOpen ? "is-active" : ""}`} onClick={() => setSortOpen((sortOpen) => !sortOpen)}>Ordenar&nbsp;<i className="bi bi-caret-down-fill"></i></button>
                                        <div className={`ItemList__sortOptions ${sortOpen ? "is-visible" : ""}`}>
                                            <button className={`ItemList__sortOptions__lowest ${sortActive === "low" ? "is-active" : null}`} onClick={() => { sortAllLow() }}>Menor Precio</button>
                                            <button className={`ItemList__sortOptions__highest ${sortActive === "high" ? "is-active" : null}`} onClick={() => { sortAllHigh() }}>Mayor Precio</button>
                                            <button className={`ItemList__sortOptions__relevance ${sortActive === "relevance" ? "is-active" : null}`} onClick={() => { sortAllRelevance() }}>Relevancia</button>
                                        </div>
                                    </div>
                                    <div className="ItemList__pagination">
                                        <p className="ItemList__pagination__content">
                                            <span className="ItemList__pagination__content__total">
                                                <span>{Number(1 + pagination.per_page * (pagination.page - 1)).toLocaleString()} </span>- <span>{Number(pagination.page * pagination.per_page).toLocaleString()} </span>de <span>{pagination.items>10000?Number(10000).toLocaleString():pagination.items.toLocaleString()}</span>
                                            </span>
                                            <span className="ItemList__pagination__content__controls">
                                                <button onClick={()=>{
                                                    paginationFetch(pagination.urls.prev)
                                                }}>&lt; Anterior</button>
                                                <button onClick={()=>{
                                                    paginationFetch(pagination.urls.next)
                                                }}>Siguiente &gt;</button>
                                            </span>
                                        </p>
                                    </div>
                                    <LayoutGroup>
                                        <div className="ItemList__content">
                                            {productos.map((producto) => {
                                                return (
                                                    <Item key={producto?.id} id={producto?.id} title={producto?.artists_sort ? (`${producto?.artists_sort} - ${producto?.title}`) : producto?.title} img={producto?.cover_image === 'https://s.discogs.com/0cfc9ba1706020d48f4db57ed5320370674ab122/images/spacer.gif'?"/src/assets/disc.jpg":(producto?.cover_image || producto?.images?.[0]?.resource_url)} price={producto?.price} />
                                                )
                                            })}
                                        </div>
                                    </LayoutGroup>
                                </div> : <div className="ItemList__noProducts">No se encontraron resultados... <Link className="ItemList__noProducts__link" to="/">Ir al inicio?</Link></div>}

                            </motion.div>
                        </AnimatePresence>
                }

            </div>
        </>
    )
}