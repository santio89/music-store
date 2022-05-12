import React, { createContext, useState, useEffect } from 'react'
import { getAuth, signOut, signInWithRedirect, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();


export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });

    onAuthStateChanged(auth, (user) => {
        setAuthUser(user);
    })

    const authLogIn = () => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                setAuthLoading(true);
                return signInWithRedirect(auth, googleProvider).then((result) => {
                    setAuthUser(result.user);

                }).catch((error) => {
                    setAuthLoading(false);
                    console.log("error in auth sign in: " + error);
                });
            })
            .catch((error) => {
                setAuthLoading(false);
                console.log("error setting persistance: " + error);
            });
    }

    const authLogOut = () => {
        signOut(auth).then(() => {
            setAuthUser(null);
        }).catch((error) => {
            console.log("error signing out: " + error)
        });
    }

    useEffect(()=>{
        setAuthLoading(false);
    }, [authUser])

    return (
        <AuthContext.Provider value={{ authLogIn, authLogOut, authUser, authLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
