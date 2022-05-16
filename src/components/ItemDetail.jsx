import React, { useState, useContext, useEffect, useRef } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';
import CartWidget from './CartWidget';
import '../../src/styles/css/ItemDetail.css';


export default function ItemDetail({ loading, producto, spotifyId }) {

    const initialCount = 1;

    const history = useNavigate();
    const [continueCheckout, setContinueCheckout] = useState(false);
    const [imgSelected, setImgSelected] = useState("");
    const { cartAdd } = useContext(CartContext);
    const imgModal = useRef();


    const onAdd = (count) => {
        setContinueCheckout(true);
        cartAdd({ ...producto, count });
    }

    const failToAdd = () => {
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }

    const changeImgSelected = (imgUrl) => {
        setImgSelected(imgUrl)
    }

    useEffect(() => {
        setImgSelected(producto?.cover_image || producto?.images?.[0]?.resource_url)
    }, [producto]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const modalCloseClick = (e) => { if (e.target === imgModal.current) { imgModal.current.close(); window.removeEventListener("click", modalCloseClick) } };
    const modalCloseScroll = () => { imgModal.current.close(); window.removeEventListener("scroll", modalCloseScroll) }

    return (
        <>

            <div className='ItemDetailWrapper'>
                {
                    loading ? <PuffLoader color={"var(--color-one)"} loading={loading} size={200} speedMultiplier={1.2} /> : (
                        <AnimatePresence>
                            <motion.div className='ItemDetail' key="ItemDetail"
                                initial={{ opacity: 0, x: "-120%" }}
                                animate={{ opacity: 1, x: "0%" }}
                                exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                                <button onClick={() => { history(-1) }} className='ItemDetail__back'><i className="bi bi-caret-left-fill"></i></button>
                                <div className='ItemDetail__body'>
                                    <div className='ItemDetail__detailsWrapper'>
                                        <button onClick={() => {
                                            imgModal.current.showModal();
                                            window.addEventListener("click", modalCloseClick);
                                            window.addEventListener("scroll", modalCloseScroll)
                                        }}>
                                            <img alt={`${producto?.title} - ${producto?.artists_sort}`} src={imgSelected || "https://raw.githubusercontent.com/santio89/music-store/master/src/assets/disc.jpg"} loading="lazy"></img>
                                        </button>
                                        <div className='ItemDetail__imgSelector'>
                                            {producto?.images?.slice(0, 4).map((img) => {
                                                return <button key={img.resource_url} onClick={() => { changeImgSelected(img.resource_url) }}><img alt="img01" src={img.resource_url} loading="lazy"></img></button>
                                            })}
                                        </div>

                                        <dialog className='ItemDetail__imgModal' ref={imgModal}><button onClick={() => { imgModal.current.close() }}>X</button><img alt={`${producto?.title} - ${producto?.artists_sort}`} src={imgSelected || "https://raw.githubusercontent.com/santio89/music-store/master/src/assets/disc.jpg"} loading="lazy"></img></dialog>

                                        <div className='ItemDetail__pWrapper'>
                                            <p>◖TITULO: {producto?.title?.toUpperCase()}</p>
                                            <p>◖ARTISTA: {producto?.artists_sort?.toUpperCase()}</p>
                                            <details>
                                                <summary>Más Info</summary>
                                                <p>&nbsp;◖Género: {producto?.genres?.join(" - ")}</p>
                                                <p>&nbsp;◖Año: {producto?.year}</p>
                                                <p>&nbsp;◖País: {producto?.country}</p>
                                                <p>&nbsp;◖Sello: {producto?.labels?.[0].name}</p>
                                                <p>&nbsp;◖Formato: {producto?.formats?.[0].name}</p>
                                            </details>
                                            <details>
                                                <summary>Tracklist</summary>
                                                {
                                                    producto?.tracklist?.map(track => <p key={`${track.position}-${track.title}`}>&nbsp;{track.position} - {track.title}</p>)
                                                }
                                            </details>

                                            <details>
                                                <summary>Spotify</summary>
                                                <iframe title='spotify-tracklist' src={`https://open.spotify.com/embed/album/${spotifyId && spotifyId}?utm_source=generator`} width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                                            </details>
                                        </div>
                                    </div>
                                    <div className="ItemDetail__infoWrapper">
                                        <div className="ItemDetail__info">
                                            <div className="ItemDetail__info__main">
                                                <p className='ItemDetail__subtitle'>{producto?.artists_sort}</p>
                                                <h2 className='ItemDetail__title'>{producto?.title?.toUpperCase()}</h2>
                                            </div>
                                            <div className='ItemDetail__controlsWrapper'>
                                                <AnimatePresence>
                                                    {continueCheckout ?
                                                        <motion.div key="checkout" initial={{ opacity: 0, x: "-120%" }}
                                                            animate={{ opacity: 1, x: "0%" }}
                                                            exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='ItemDetail__checkout'>
                                                            <motion.h3 key="ProductsAdded" initial={{ opacity: 0, x: "-120%" }}
                                                                animate={{ opacity: 1, x: "0%" }}
                                                                exit={{ opacity: 0, x: "120%" }}
                                                                transition={{ type: 'spring', duration: .8, stiffness: 140, mass: 1.2 }}>Productos<br />agregados!</motion.h3>
                                                            <div className='ItemDetail__checkout__buttons'>
                                                                <CartWidget message={"Ir al checkout"} />
                                                                <button onClick={() => { setContinueCheckout(false) }} className='ItemDetail__checkout__continue'>Seguir comprando</button>
                                                            </div>
                                                        </motion.div> :
                                                        <motion.div key="count" initial={{ opacity: 0, x: "-120%" }}
                                                            animate={{ opacity: 1, x: "0%" }}
                                                            exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='ItemDetail__counterWrapper'>
                                                            <p className='ItemDetail__counterWrapper__price'>{"$" + producto?.price}<span>(USD)</span></p>
                                                            <ItemCount onAdd={onAdd} failToAdd={failToAdd} initial={initialCount} stock={producto?.stock} id={producto?.id} />
                                                        </motion.div>}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
            </div>
        </>
    )
}
