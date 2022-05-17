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
    const { authUser, authLogIn, userData } = useContext(AuthContext);
    const [wishLoading, setWishLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setWishLoading(false);
            if (userData?.userWishlist == null || userData?.userWishlist === undefined) {
                setWishLoading(true);
            }
        }, 400);

    }, [userData, authUser])

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
                        {authUser && authUser != null ?
                            <div className='Wishlist__details'>
                                {wishlist.length === 0 ? <p className='Wishlist__noorder'>Aún no has agregado favoritos.<br /><Link to="/">SEGUIR NAVEGANDO</Link></p> :

                                    <ul className='Wishlist__details__list'>
                                        <LayoutGroup>
                                            {wishlist.map(item => <AnimatePresence key={`wishlist${item.id}`} exitBeforeEnter> <motion.li drag layout initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: .4 }} title={item.artists_sort ? `${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}` : item.title.toUpperCase()} >

                                                <div className='Wishlist__details__list__title'><span>{item.artists_sort ? `${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}` : item.title.toUpperCase()}</span><Link to={`/item/${item?.id}`}><img alt="wishlist img" src={`${item?.cover_image || item?.images?.[0]?.resource_url}`}></img></Link></div>

                                                <button className='Wishlist__details__list__wish'><i className="bi bi-suit-heart-fill" onClick={() => wishlistRemove(item)}></i></button>
                                                <div className='Wishlist__details__list__price'>${item.price}</div>
                                            </motion.li></AnimatePresence>)}
                                        </LayoutGroup>

                                    </ul>

                                }
                            </div> :
                            <div className='Wishlist__nouser'><p>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus favoritos</p></div>}

                    </motion.div>
                </AnimatePresence>}
        </div>
    )
}
