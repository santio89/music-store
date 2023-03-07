import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import "../styles/css/Wishlist.css";

export default function Wishlist() {
    const history = useNavigate();

    const { wishlist, wishlistRemove } = useContext(WishlistContext);
    const { authUser, authLogIn, authLoading, userDataLoading } = useContext(AuthContext);
    const [removeItem, setRemoveItem] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className='WishlistWrapper'>
            {authLoading ? <PuffLoader color={"var(--color-one)"} loading={authLoading} size={200} speedMultiplier={1.2} /> :
                <AnimatePresence>
                    <motion.div key="Wishlist" className='Wishlist'
                        initial={{ opacity: 0, x: "-120%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "120%" }}
                        transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                        <button onClick={() => { history(-1) }} className='Checkout__back'><i className="bi bi-caret-left-fill"></i></button>
                        <h1>WISHLIST</h1>
                        <LayoutGroup>
                            {authUser ?
                                <motion.div layout className='Wishlist__details' initial={{ opacity: 0, x: "-120%" }}
                                    animate={{ opacity: 1, x: "0%" }}
                                    exit={{ opacity: 0, x: "120%" }}
                                    transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                                    <motion.ul layout className='Wishlist__details__list' initial={{ x: "-120%" }}
                                        animate={{ x: "0%" }}
                                        exit={{ x: "120%" }}
                                        transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                                        {!userDataLoading && wishlist?.length === 0 ? <motion.p layout className='Wishlist__nowish' initial={{ x: "-120%" }}
                                            animate={{ x: "0%" }}
                                            exit={{ x: "120%" }}
                                            transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>Aún no has agregado favoritos.<br /><Link to="/">SEGUIR NAVEGANDO</Link></motion.p> : (<>
                                                {userDataLoading && <PuffLoader color={"var(--color-one)"} loading={userDataLoading} size={200} speedMultiplier={1.2} />}
                                                {wishlist?.map(item => <AnimatePresence key={`wishlist${item.id}`}> <motion.li layout initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: .4 }} title={item.artists_sort ? `${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}` : item.title.toUpperCase()} className={removeItem === item.id ? "Wishlist__details__list__filter" : ""}>

                                                    <motion.div className='Wishlist__details__list__title'><span>{item.artists_sort ? `${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}` : item.title.toUpperCase()}</span><Link to={`/item/${item?.id}`}><div className='Wishlist__details__list__title__imgContainer'><motion.img alt="wishlist img" src={`${item?.cover_image || item?.images?.[0]?.resource_url}`}></motion.img></div></Link></motion.div>

                                                    <motion.button className='Wishlist__details__list__wish'><motion.i className="bi bi-suit-heart-fill" onClick={() => setRemoveItem(item.id)}></motion.i></motion.button>

                                                    <motion.div className='Wishlist__details__list__price'>${item.price}</motion.div>
                                                    {removeItem === item.id && <motion.div className='Wishlist__details__list__remove' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
                                                        <p>ELIMINAR?</p>
                                                        <div className='Wishlist__details__list__remove__buttons'>
                                                            <button onClick={() => wishlistRemove(item)}>SI</button>
                                                            <button onClick={() => setRemoveItem("")}>NO</button>
                                                        </div>
                                                    </motion.div>}

                                                </motion.li></AnimatePresence>)}</>)}
                                    </motion.ul>
                                </motion.div> :
                                <motion.div className='Wishlist__nouser' initial={{ opacity: 0, x: "-120%" }}
                                    animate={{ opacity: 1, x: "0%" }}
                                    exit={{ opacity: 0, x: "120%" }}
                                    transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}><p layout>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus favoritos</p></motion.div>}
                        </LayoutGroup>
                    </motion.div>
                </AnimatePresence>}
        </div>
    )
}
