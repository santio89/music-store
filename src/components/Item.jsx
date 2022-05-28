/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/css/Item.css';
import { WishlistContext } from '../Context/WishlistContext'
import { AuthContext } from '../Context/AuthContext'


export default function Item({ id, title, img, price, prod, listStyle }) {
    const { wishlistAdd, wishlistRemove, inWishlist } = useContext(WishlistContext);


    const ItemWishBtn = ({ id }) => {
        const [wishActive, setWishActive] = useState(inWishlist(id));
        const [noWish, setNoWish] = useState(false);
        const [timeoutId, setTimeoutId] = useState(null);
        const { authUser, authLogIn } = useContext(AuthContext);

        return (
            <>
                {noWish && <p layout className={listStyle === "grid" ? 'ItemWrapper__nowish' : 'ItemWrapperB__nowish'}><button onClick={() => authLogIn()}>INGRESAR</button></p>}

                <button onClick={() => {
                    clearTimeout(timeoutId);
                    if (!authUser) {
                        setNoWish(true);
                        setTimeoutId(setTimeout(() => setNoWish(false), 4000))
                    } else {
                        if (!wishActive) { wishlistAdd(prod); setWishActive(true) } else { wishlistRemove(prod); setWishActive(false) }
                    }

                }} className={`${listStyle === "grid" ? "ItemWrapper__wish" : "ItemWrapperB__wish"} ${wishActive ? "is-active" : ""}`}><i layout className="bi bi-suit-heart-fill"></i></button>
            </>
        )
    }

    return (
        <>
                    <div className={listStyle === "grid" ? "ItemWrapper" : "ItemWrapperB"}>
                        <Link to={`/item/${id}`} className={listStyle === "grid" ? "ItemWrapper__ItemLink" : "ItemWrapperB__ItemLink"}>
                            <div className={listStyle === "grid" ? "Item" : "ItemB"} >
                                <div className={listStyle === "grid" ? "Item__imgWrapper" : "ItemB__imgWrapper"}><img className={listStyle === "grid" ? "Item__img" : "ItemB__img"} src={img} alt={"cover_image_" + id} loading="lazy"></img></div>
                                <div className={listStyle === "grid" ? "Item__content" : "ItemB__content"}>
                                    <p className={listStyle === "grid" ? "Item__content__price" : "ItemB__content__price"}>${price}</p>
                                    <h3 className={listStyle === "grid" ? "Item__content__title" : "ItemB__content__title"} title={title}>{title}</h3>
                                </div>
                                <div className={listStyle === "grid" ? "Item__details" : "ItemB__details"}>Detalles</div>
                            </div>
                        </Link>
                        <ItemWishBtn id={id} />
                    </div>
        </>
    )
}