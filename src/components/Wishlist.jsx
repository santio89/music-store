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
    const { authUser, authLogIn, userData, isLoggedIn, userDataLoading } = useContext(AuthContext);
    const [wishLoading, setWishLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (authUser && !userData.userWishlist && userData.Wishlist != null && userData.Wishlist !== undefined) {
                setWishLoading(true);
            } else {
                setWishLoading(false);
            }
        }, 400);

    }, [userData, authUser, isLoggedIn])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='WishlistWrapper'>
            {wishLoading ? <PuffLoader color={"var(--color-one)"} loading={wishLoading} size={200} speedMultiplier={1.2} /> :
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


                                    <motion.ul layout className='Wishlist__details__list' initial={{ opacity: 0, x: "-120%" }}
                                        animate={{ opacity: 1, x: "0%" }}
                                        exit={{ opacity: 0, x: "120%" }}
                                        transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                                        {!userDataLoading && wishlist?.length === 0 ? <motion.p layout className='Wishlist__nowish' initial={{ opacity: 0, x: "-120%" }}
                                            animate={{ opacity: 1, x: "0%" }}
                                            exit={{ opacity: 0, x: "120%" }}
                                            transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>Aún no has agregado favoritos.<br /><Link to="/">SEGUIR NAVEGANDO</Link></motion.p> : (<>
                                            { userDataLoading && <PuffLoader color={"var(--color-one)"} loading={userDataLoading} size={200} speedMultiplier={1.2} />}
                                        {wishlist?.map(item => <AnimatePresence key={`wishlist${item.id}`}> <motion.li layout initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: .4 }} title={item.artists_sort ? `${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}` : item.title.toUpperCase()} >

                                            <motion.div className='Wishlist__details__list__title'><span>{item.artists_sort ? `${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}` : item.title.toUpperCase()}</span><Link to={`/item/${item?.id}`}><motion.img alt="wishlist img" src={`${item?.cover_image || item?.images?.[0]?.resource_url}`}></motion.img></Link></motion.div>

                                            <motion.button className='Wishlist__details__list__wish'><motion.i className="bi bi-suit-heart-fill" onClick={() => wishlistRemove(item)}></motion.i></motion.button>
                                            <motion.div className='Wishlist__details__list__price'>${item.price}</motion.div>
                                        </motion.li></AnimatePresence>)}</>)}
                                    </motion.ul>
                                </motion.div> :
                                <div className='Wishlist__nouser' initial={{ opacity: 0, x: "-120%" }}
                                    animate={{ opacity: 1, x: "0%" }}
                                    exit={{ opacity: 0, x: "120%" }}
                                    transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}><p layout>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus favoritos</p></div>}
                        </LayoutGroup>
                    </motion.div>
                </AnimatePresence>}
        </div>
    )
}
