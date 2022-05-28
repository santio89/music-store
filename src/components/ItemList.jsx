import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Item from './Item'
import '../../src/styles/css/ItemList.css';
import PuffLoader from "react-spinners/PuffLoader";

export default function ItemList({ productos, isProductos, searchId, loading, sortOpen, setSortOpen, sortActive, pagination, paginationFetch, paginationLoading, sortAllHigh, sortAllRelevance, sortAllHot }) {
    const { categoryId } = useParams();

    const history = useNavigate();
    const topPagRef = useRef(null);
    const selectCategory = useRef();
    const [listStyle, setListStyle] = useState(localStorage.getItem("msListStyle") ? localStorage.getItem("msListStyle") : "grid");

    useEffect(() => {
        if (categoryId) {
            window.scrollTo(0, 0);
            selectCategory.current.value = categoryId;
        }
    }, [categoryId])

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
                        searchId ? <div>BUSCANDO: {searchId.replace(/\+/g, " ").toUpperCase()}</div> : (categoryId ? (<div>VIENDO: <select ref={selectCategory} name="categorias" defaultValue={categoryId} onChange={(e) => { history(`../categories/${e.target.value.replace(/\s/g, "+")}`) }}>
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

            <div className={`ItemListWrapper ${paginationLoading ? "paginationLoading" : ""}`}>
                {
                    loading ? (<PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} />) :
                        <AnimatePresence>
                            <motion.div transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} key="ItemList" className="ItemList"
                                initial={{ opacity: 0, x: "-120%" }}
                                animate={{ opacity: 1, x: "0%" }}
                                exit={{ opacity: 0, x: "120%" }}>

                                {isProductos ? <div className="ItemList__contentWrapper" ref={topPagRef}>
                                    <div className="ItemList__sortWrapper">
                                        <button className={`ItemList__sort ${sortOpen ? "is-active" : ""}`} onClick={() => setSortOpen((sortOpen) => !sortOpen)}>Ordenar&nbsp;<i className="bi bi-caret-down-fill"></i></button>
                                        <div className={`ItemList__sortOptions ${sortOpen ? "is-visible" : ""}`}>
                                            <button className={`ItemList__sortOptions__hot ${sortActive === "hot" ? "is-active" : null}`} onClick={() => { sortAllHot() }}>Últimos</button>
                                            <button className={`ItemList__sortOptions__relevance ${sortActive === "relevance" ? "is-active" : null}`} onClick={() => { sortAllRelevance() }}>Relevancia</button>
                                            <button className={`ItemList__sortOptions__highest ${sortActive === "high" ? "is-active" : null}`} onClick={() => { sortAllHigh() }}>Precio</button>
                                        </div>
                                    </div>
                                    <div className="ItemList__pagination">

                                        <div className="ItemList__pagination__startend">
                                            <button onClick={() => { setListStyle("grid"); localStorage.setItem("msListStyle", "grid") }} className={listStyle === "grid" ? "is-active" : ""}><i className="bi bi-grid-3x3-gap-fill"></i></button>
                                            <button onClick={() => { setListStyle("list"); localStorage.setItem("msListStyle", "list") }} className={listStyle === "list" ? "is-active" : ""}><i className="bi bi-list-ul"></i></button>
                                            <button onClick={() => {
                                                paginationFetch(pagination.urls.first)
                                            }}>Inicio</button>
                                            <button onClick={() => {
                                                paginationFetch(pagination.urls.last)
                                            }}>Final</button>
                                        </div>

                                        <div className="ItemList__pagination__content">
                                            <span className="ItemList__pagination__content__total">
                                                <span>{Number(1 + pagination.per_page * (pagination.page - 1)).toLocaleString()} </span>- <span>{Number(pagination.page * pagination.per_page).toLocaleString()} </span>de <span>{pagination.items > 10000 ? Number(10000).toLocaleString() : pagination.items.toLocaleString()}</span>
                                            </span>
                                            <span className="ItemList__pagination__content__controls">
                                                <div className="ItemList__pagination__content__controls__buttonContainer">
                                                    <button onClick={() => {
                                                        paginationFetch(pagination.urls.prev)
                                                    }}>&lt;&nbsp;Anterior</button>
                                                    <button onClick={() => {
                                                        paginationFetch(pagination.urls.next)
                                                    }}>Siguiente&nbsp;&gt;</button>
                                                </div>

                                            </span>
                                        </div>
                                    </div>

                                    <div layout className={listStyle === "grid" ? "ItemList__content" : "ItemList__contentB"}>
                                        {productos.map((producto) => {
                                            return (
                                                <Item key={producto?.id} id={producto?.id} title={producto?.artists_sort ? (`${producto?.artists_sort} - ${producto?.title}`) : producto?.title} img={producto?.cover_image.endsWith("spacer.gif") ? "https://raw.githubusercontent.com/santio89/music-store/master/src/assets/disc.jpg" : (producto?.cover_image || producto?.images?.[0]?.resource_url)} price={producto?.price} prod={producto} listStyle={listStyle} />
                                            )
                                        })}
                                    </div>


                                    <div className="ItemList__pagination">

                                        <div className="ItemList__pagination__startend">
                                            <button onClick={() => { setListStyle("grid"); localStorage.setItem("msListStyle", "grid") }} className={listStyle === "grid" ? "is-active" : ""}><i className="bi bi-grid-3x3-gap-fill"></i></button>
                                            <button onClick={() => { setListStyle("list"); localStorage.setItem("msListStyle", "list") }} className={listStyle === "list" ? "is-active" : ""}><i className="bi bi-list-ul"></i></button>
                                            <button onClick={() => {
                                                topPagRef.current.scrollIntoView();
                                                paginationFetch(pagination.urls.first);
                                            }}>Inicio</button>
                                            <button onClick={() => {
                                                topPagRef.current.scrollIntoView();
                                                paginationFetch(pagination.urls.last);
                                            }}>Final</button>
                                        </div>

                                        <div className="ItemList__pagination__content">
                                            <span className="ItemList__pagination__content__total">
                                                <span>{Number(1 + pagination.per_page * (pagination.page - 1)).toLocaleString()} </span>- <span>{Number(pagination.page * pagination.per_page).toLocaleString()} </span>de <span>{pagination.items > 10000 ? Number(10000).toLocaleString() : pagination.items.toLocaleString()}</span>
                                            </span>
                                            <span className="ItemList__pagination__content__controls">
                                                <div className="ItemList__pagination__content__controls__buttonContainer">
                                                    <button onClick={() => {
                                                        topPagRef.current.scrollIntoView();
                                                        paginationFetch(pagination.urls.prev);
                                                    }}>&lt;&nbsp;Anterior</button>
                                                    <button onClick={() => {
                                                        topPagRef.current.scrollIntoView();
                                                        paginationFetch(pagination.urls.next);
                                                    }}>Siguiente&nbsp;&gt;</button>
                                                </div>

                                            </span>
                                        </div>
                                    </div>
                                </div> : <div className="ItemList__noProducts">No se encontraron resultados... <Link className="ItemList__noProducts__link" to="/">Ir al inicio?</Link></div>}

                            </motion.div>
                        </AnimatePresence>
                }

            </div>
        </>
    )
}