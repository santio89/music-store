import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { WishlistContext } from '../Context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import "../styles/css/Wishlist.css";

export default function Wishlist() {
    const history = useNavigate();

    const { wishlist, wishlistItems, wishlistClear, wishlistRemove, inWishlist } = useContext(WishlistContext);

    const [removeItemSelected, setRemoveItemSelected] = useState(0);
    const [wishlistClearConfirm, setWishlistClearConfirm] = useState(false);

  


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

                        <div className='Wishlist__details'>
                            <ul className='Wishlist__details__items'>
                                {wishlist.map(item=><li key={item.id}><span><span className='Wishlist__details__items__artist'>{item.artists_sort}</span><br/><span>{item.title.toUpperCase()}</span></span></li>)}
                            </ul>
                        </div>

                    </motion.div>
            </AnimatePresence>
        </div>
    )
}
