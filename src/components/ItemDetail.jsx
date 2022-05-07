import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import PuffLoader from "react-spinners/PuffLoader";
import ItemCount from './ItemCount';
import CartWidget from './CartWidget';
import '../../src/styles/css/ItemDetail.css';

export default function ItemDetail({ loading, producto }) {

    const initialCount = 1;

    const history = useNavigate();
    const [continueCheckout, setContinueCheckout] = useState(false);

    const { cartAdd } = useContext(CartContext)

    /*     const [spotifySearch, setSpotifySearch] = useState(" "); */
    const [spotifyId, setSpotifyId] = useState(" ");


    const onAdd = (count) => {
        setContinueCheckout(true);
        cartAdd({ ...producto, count });
    }

    const failToAdd = () => {
        console.log("FAIL TO ADD (NOT ENOUGH STOCK)");
    }

    useEffect(() => {
        window.scrollTo(0, 0);





        /*  fetch(`https://api.spotify.com/v1/albums/${spotifyId}?market=ES`, {
             headers: {
                 Accept: "application/json",
                 Authorization: "Bearer BQAqNF0DD4Ht6mkn3f8yJrIwrA5Ows0cnajS-j-MKVxa2_5wTMY7d8nErVeGB5Kg-TsxCSig20Qc7L1JOQ4iuGqUDBm9KPrERvWtP8WbVGctPsSFxcNKOfstOv20hnMboeaaB0ewVJvejj4_FRABXnoYvKbrXQM",
                 "Content-Type": "application/json"
             }
         }).then(res => {
             console.log(res)
           
         }) */

        fetch(`https://api.spotify.com/v1/search?q=${producto?.title}%20${producto?.artists_sort}&type=album`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer BQDXkYwf7aUexz4raa7Z6RhK9DiGEC1igESXZUrZckmqKyf9bmHE673aB1zkhbe3YYX5NAUaa9VIz_-xHXHruEVww3gz7MKhhtssfRy3Jzt27Cz8eT3Ov9QKo8GxltKROqnMq0jywJKtoDetKWT_lVFxn1QKb4g",
                "Content-Type": "application/json"
            }
        }).then(res => {
            res.json().then(res => {
                setSpotifyId(res?.albums?.items?.[0]?.id)
            })
        })


    }, [producto]);




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
                                    <div className='ItemDetail__imgWrapper'>
                                        <img alt="item" src={producto?.cover_image || producto?.images?.[0]?.resource_url} loading="lazy"></img>
                                        <div className='ItemDetail__pWrapper'>
                                            <p>◖Título: {producto?.title}</p>
                                            <p>◖Artista: {producto?.artists_sort}</p>
                                            <p>◖Género: {producto?.genres?.join(" - ")}</p>
                                            <p>◖Año: {producto?.year}</p>
                                            <p>◖País: {producto?.country}</p>
                                            <p>◖Sello: {producto?.labels?.[0].name}</p>
                                            <p>◖Formato: {producto?.formats?.[0].name}</p>
                                            <details>
                                                <summary>Tracklist</summary>
                                                {
                                                    producto?.tracklist?.map(track => <p key={`${track.position}-${track.title}`}>&nbsp;{track.position} - {track.title}</p>)
                                                }
                                            </details>
                                            <details>
                                                <summary>Spotify</summary>
                                                <iframe title='spotify-tracklist' style={{ borderRadius: "12px" }} src={`https://open.spotify.com/embed/album/${spotifyId && spotifyId}?utm_source=generator`} width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
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
                                                            <p className='ItemDetail__counterWrapper__price'>{"$" + producto?.price}</p>
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
