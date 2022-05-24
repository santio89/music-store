import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    const { authUser, userData, firebaseSetUserWishlist } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);


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

    const inWishlist = (id) => {
        if (wishlist) {
            const itemIndex = wishlist.findIndex(producto => { return (producto.id === id) });
            if (itemIndex !== -1) {
                return true
            } else {
                return false
            }
        }
    };


    /* storage persistente entre ventanas */
    useEffect(() => {
        const checkStorageWish = (e) => {
            const { key, newValue } = e;

            if (authUser) {
                if (key === `msWishList-${userData?.uid}`) {
                    setWishlist(JSON.parse(newValue));
                }
            }
        }
        window.addEventListener("storage", checkStorageWish)

        return (() => window.removeEventListener("storage", checkStorageWish))
    })
    /* fin local storage persistent entre ventanas */


    /* logout useEffect  */
    useEffect(() => {
        if (userData?.userWishlist) {
            setWishlist(JSON.parse(userData.userWishlist))
        } else if (userData === null) {
            setWishlist([]);
        }
    }, [userData])
    /* fin logout useEffect */


    useEffect(() => {
        if (wishlist) {
            if (authUser && userData && userData.uid) {
                if (JSON.stringify(wishlist) !== JSON.stringify(localStorage.getItem(`msWishList-${userData.uid}`))) {
                    localStorage.setItem(`msWishList-${userData.uid}`, JSON.stringify(wishlist))
                    firebaseSetUserWishlist(authUser, { userWishlist: JSON.stringify(wishlist) })
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishlist/* , authUser, userData, firebaseSetUserWishlist */])



    return (
        <>
            <WishlistContext.Provider value={{ wishlist, wishlistClear, wishlistAdd, wishlistRemove, inWishlist }}>
                {children}
            </WishlistContext.Provider>
        </>
    )
}
