import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/css/Wishlist.css";

export default function Wishlist() {
    const history = useNavigate();

    const { wishlist, wishlistRemove } = useContext(WishlistContext);
    const { authUser, authLogIn } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='WishlistWrapper'>
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
                                    <AnimatePresence>
                                        {wishlist.map(item => <motion.li key={`wishlist${item.id}`} title={item.artists_sort?`${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}`:item.title.toUpperCase()} initial={{ opacity: 0, x: "-120%" }} animate={{ opacity: 1, x: "0%" }} exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>

                                            <div className='Wishlist__details__list__title'><span>{item.artists_sort?`${item.artists_sort.toUpperCase()} - ${item.title.toUpperCase()}`:item.title.toUpperCase()}</span><Link to={`/item/${item?.id}`}><img alt="wishlist img" src={`${item?.cover_image || item?.images?.[0]?.resource_url}`}></img></Link></div>

                                            <button className='Wishlist__details__list__wish'><i className="bi bi-suit-heart-fill" onClick={() => wishlistRemove(item)}></i></button>
                                            <div className='Wishlist__details__list__price'>${item.price}</div>
                                        </motion.li>)}
                                    </AnimatePresence>
                                </ul>
                            }
                        </div> :
                        <div className='Wishlist__nouser'><p>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus favoritos</p></div>}

                </motion.div>
            </AnimatePresence>
        </div>
    )
}
