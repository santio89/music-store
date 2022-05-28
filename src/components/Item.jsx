/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/css/Item.css';
import { WishlistContext } from '../Context/WishlistContext'
import { AuthContext } from '../Context/AuthContext'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'


export default function Item({ id, title, img, price, prod, listStyle }) {
    const { wishlistAdd, wishlistRemove, inWishlist } = useContext(WishlistContext);


    const ItemWishBtn = ({ id }) => {
        const [wishActive, setWishActive] = useState(inWishlist(id));
        const [noWish, setNoWish] = useState(false);
        const [timeoutId, setTimeoutId] = useState(null);
        const { authUser, authLogIn } = useContext(AuthContext);

        return (
            <>
                {noWish && <motion.p layout className={listStyle === "grid" ? 'ItemWrapper__nowish' : 'ItemWrapperB__nowish'}><button onClick={() => authLogIn()}>INGRESAR</button></motion.p>}

                <button onClick={() => {
                    clearTimeout(timeoutId);
                    if (!authUser) {
                        setNoWish(true);
                        setTimeoutId(setTimeout(() => setNoWish(false), 4000))
                    } else {
                        if (!wishActive) { wishlistAdd(prod); setWishActive(true) } else { wishlistRemove(prod); setWishActive(false) }
                    }

                }} className={`${listStyle === "grid" ? "ItemWrapper__wish" : "ItemWrapperB__wish"} ${wishActive ? "is-active" : ""}`}><motion.i layout className="bi bi-suit-heart-fill"></motion.i></button>
            </>
        )
    }

    return (
        <>
            <AnimatePresence>
                <LayoutGroup>
                    <motion.div layout className={listStyle === "grid" ? "ItemWrapper" : "ItemWrapperB"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .4 }}>
                        <Link to={`/item/${id}`} className={listStyle === "grid" ? "ItemWrapper__ItemLink" : "ItemWrapperB__ItemLink"}>
                            <motion.div layout className={listStyle === "grid" ? "Item" : "ItemB"} >
                                <motion.div layout className={listStyle === "grid" ? "Item__imgWrapper" : "ItemB__imgWrapper"}><motion.img layout className={listStyle === "grid" ? "Item__img" : "ItemB__img"} src={img} alt={"cover_image_" + id} loading="lazy"></motion.img></motion.div>
                                <motion.div layout className={listStyle === "grid" ? "Item__content" : "ItemB__content"}>
                                    <motion.p layout className={listStyle === "grid" ? "Item__content__price" : "ItemB__content__price"}>${price}</motion.p>
                                    <motion.h3 layout className={listStyle === "grid" ? "Item__content__title" : "ItemB__content__title"} title={title}>{title}</motion.h3>
                                </motion.div>
                                <motion.div layout className={listStyle === "grid" ? "Item__details" : "ItemB__details"}>Detalles</motion.div>
                            </motion.div>
                        </Link>
                        <ItemWishBtn id={id} />
                    </motion.div>
                </LayoutGroup>
            </AnimatePresence>
        </>
    )
}