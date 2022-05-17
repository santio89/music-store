import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    const { authUser, userData, firebaseSetUserWishlist } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState(() => localStorage.getItem(`msWishlist-${userData?.uid}`) && localStorage.getItem(`msWishlist-${userData?.uid}`) !== undefined && authUser ? JSON.parse(localStorage.getItem(`msWishlist-${userData?.uid}`)) : []);


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
        const itemIndex = wishlist.findIndex(producto =>{return (producto.id === id)} );
        if (itemIndex !== -1) {
            return true
        } else {
            return false
        }
    };


   
   /* storage persistente entre ventana / bugs  */
    useEffect(() => {
        const checkStorageWish = (e) => {
            const { key, newValue } = e;

            if (key === `msWishlist-${userData?.uid}`) {
                setWishlist(JSON.parse(newValue));
            }
        }
        window.addEventListener("storage", checkStorageWish)

        return (() => window.removeEventListener("storage", checkStorageWish))
    })
  /* fin local storage persistent entre ventanas */


    /* logout useEffect / separar storage usuario o generico */
    useEffect(() => {
        if (userData?.userWishlist != null && userData?.userWishlist !== "") {
            setWishlist(JSON.parse(userData.userWishlist))
        } else if (userData === null){
            setWishlist([]);
        }
    }, [userData])
    /* fin logout useEffect */


    useEffect(() => {
        if (wishlist) {
            if (authUser && userData?.uid != null) {
                localStorage.setItem(`msWishlist-${userData?.uid}`, JSON.stringify(wishlist))
                firebaseSetUserWishlist(authUser, { userWishlist: JSON.stringify(wishlist) })
            } 
        }
    }, [wishlist, authUser, userData, firebaseSetUserWishlist])



    return (
        <>
            <WishlistContext.Provider value={{ wishlist, wishlistClear, wishlistAdd, wishlistRemove, inWishlist }}>
                {children}
            </WishlistContext.Provider>
        </>
    )
}
