import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    const { authUser, userData, firebaseSetUserWishlist } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState(() => localStorage.getItem("msWishlist") && localStorage.getItem("msShopList") !== undefined && !authUser ? JSON.parse(localStorage.getItem("msWishlist")) : []);
    const [wishlistItems, setWishlistItems] = useState(0);


    const wishlistAdd = (item) => {
        const itemIndex = wishlist.findIndex(producto => producto.id === item.id);
        if (itemIndex !== -1) {
            return false
        } else {
            setWishlist([...wishlist, item])
        }
    }

    const wishlistRemove = (item) => {
        setWishlist(wishlist.filter(producto => producto.id !== item.id));
    }

    const wishlistClear = () => {
        setWishlist([]);
    }

    const inWishlist = (item) => {
        const itemIndex = wishlist.findIndex(producto => producto.id === item.id);
        if (itemIndex !== -1) {
            return true
        } else {
            return false
        }
    };

    /* local storage persistent entre ventanas */
    useEffect(() => {
        const checkStorage = (e) => {
            const { key, newValue } = e;

            if (key === "msWishlist" || key === `msWishlist-${userData.uid}`) {
                setWishlist(JSON.parse(newValue));
            }
        }
        window.addEventListener("storage", checkStorage)

        return (() => window.removeEventListener("storage", checkStorage))
    })
    /* fin local storage persistent entre ventanas */


    /* logout useEffect / separar storage usuario o generico */
    useEffect(() => {
        if (userData?.userWishlist != null && userData?.userWishlist !== "") {
            setWishlist(JSON.parse(userData.userWishlist))
        } else if (userData === null) {
            setWishlist(localStorage.getItem("msWishlist") && localStorage.getItem("msWishlist") !== undefined ? JSON.parse(localStorage.getItem("msWishlist")) : [])
        }
    }, [userData])
    /* fin logout useEffect */


    useEffect(() => {
        setWishlistItems(wishlist => wishlist?.length);

        if (wishlist) {
            if (authUser && userData?.uid != null) {
                localStorage.setItem(`msWishlist-${userData.uid}`, JSON.stringify(wishlist))
                firebaseSetUserWishlist(authUser, { userWishlist: JSON.stringify(wishlist) })
            } else if (!authUser) {
                localStorage.setItem("msWishlist", JSON.stringify(wishlist))
            }
        }

    }, [wishlist, authUser, userData, firebaseSetUserWishlist])



    return (
        <>
            <WishlistContext.Provider value={{ wishlist, wishlistItems, wishlistClear, wishlistAdd, wishlistRemove, inWishlist }}>
                {children}
            </WishlistContext.Provider>
        </>
    )
}
