import React, { createContext, useState, useEffect } from 'react'
import { getAuth, signOut, signInWithRedirect, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';


export const AuthContext = createContext();


export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(localStorage.getItem("msAuthLoading") === "true" ? true : false);
    const [userData, setUserData] = useState({});
    const [userDataLoading, setUserDataLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });

    const getUserData = (user) => {
        setUserDataLoading(true);
        const database = getFirestore();
        const userDataRef = doc(database, "users", user?.uid);
        const usersCollection = collection(database, "users");

        const userObject = {
            name: user.displayName !== null ? user.displayName : "",
            email: user.email !== null ? user.email : "",
            phone: user.phoneNumber !== null ? user.phoneNumber : "",
            address: "",
            userCart: "",
            userWishlist: "",
            uid: user.uid,
            created: serverTimestamp()
        }

        getDoc(userDataRef).then(snapshot => {
            if (snapshot.exists()) {
                setUserData(snapshot.data())
                setAuthLoading(false);
                setUserDataLoading(false);
            } else {
                setUserData(userObject);
                setDoc(doc(usersCollection, user?.uid), userObject).then(() => { setAuthLoading(false); setUserDataLoading(false); }).catch(e => console.log("error creating user: " + e));
            }
        }).catch(e => console.log("error retrieving user: " + e))
    }

    onAuthStateChanged(auth, (user) => {
        setAuthUser(user);
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })

    const authLogIn = () => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                setAuthLoading(true);
                /* seteo authLoading en localStorage para que sea persistente en el redirect del auth */
                localStorage.setItem("msAuthLoading", "true");
                return signInWithRedirect(auth, googleProvider).then((result) => {
                    setAuthUser(result.user);
                }).catch((error) => {
                    setAuthLoading(false);
                    localStorage.setItem("msAuthLoading", "false");
                    console.log("error in auth sign in: " + error);
                });
            })
            .catch((error) => {
                setAuthLoading(false);
                localStorage.setItem("msAuthLoading", "false");
                console.log("error setting persistance: " + error);
            });
    }

    const authLogOut = () => {
        signOut(auth).then(() => {
            setAuthUser(null);
            setUserData(null);
            setUserDataLoading(false);
            localStorage.setItem("msAuthLoading", "false");
        }).catch((error) => {
            console.log("error signing out: " + error)
        });
    }

    const firebaseSetUserCart = (user, cart) => {
        const database = getFirestore();
        const userDataRef = doc(database, "users", user?.uid);

        setDoc(userDataRef, cart, { merge: true }).catch((e) => console.log("error setting firebase cart: " + e))
    }

    const firebaseSetUserWishlist = (user, wishlist) => {
        const database = getFirestore();
        const userDataRef = doc(database, "users", user?.uid);

        setDoc(userDataRef, wishlist, { merge: true }).catch((e) => console.log("error setting firebase wishlist: " + e))
    }

    useEffect(() => {
        if (authUser && authUser.uid) {
            getUserData(authUser);
        }
    }, [authUser])



    return (
        <AuthContext.Provider value={{ authLogIn, authLogOut, authUser, authLoading, userData, setUserData, userDataLoading, firebaseSetUserCart, firebaseSetUserWishlist, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
