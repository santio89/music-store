/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/css/Item.css';
import { WishlistContext } from '../Context/WishlistContext'
import { AuthContext } from '../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'


export default function Item({ id, title, img, price, prod }) {
    const { wishlistAdd, wishlistRemove, inWishlist } = useContext(WishlistContext);


    const ItemWishBtn = ({ id }) => {
        const [wishActive, setWishActive] = useState(inWishlist(id));
        const [noWish, setNoWish] = useState(false);
        const [timeoutId, setTimeoutId] = useState(null);
        const { authUser, authLogIn } = useContext(AuthContext);

        return (
            <>
                {noWish && <p className='ItemWrapper__nowish'><button onClick={() => authLogIn()}>INGRESAR</button></p>}

                <button onClick={() => {
                    clearTimeout(timeoutId);
                    if (!authUser) { 
                        setNoWish(true);
                        setTimeoutId(setTimeout(() => setNoWish(false), 4000))
                    } else {
                        if (!wishActive) { wishlistAdd(prod); setWishActive(true) } else { wishlistRemove(prod); setWishActive(false) }
                    }

                }} className={`ItemWrapper__wish ${wishActive ? "is-active" : ""}`}><i className="bi bi-suit-heart-fill"></i></button>
            </>
        )
    }

    return (
        <>
            <AnimatePresence>
                <motion.div className="ItemWrapper" layout 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .4 }}>
                    <Link to={`/item/${id}`} className="ItemLink">
                        <div className="Item" >
                            <div className="Item__imgWrapper"><img className="Item__img" src={img} alt={"cover_image_" + id} loading="lazy"></img></div>
                            <div className="Item__content">
                                <p className="Item__content__price">${price}</p>
                                <h3 className="Item__content__title">{title}</h3>
                            </div>
                            <div className="Item__details">Detalles</div>
                        </div>
                    </Link>
                    <ItemWishBtn id={id} />
                </motion.div>
            </AnimatePresence>
        </>
    )
}