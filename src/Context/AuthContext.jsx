import React, { createContext, useState } from 'react'
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();


export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    onAuthStateChanged(auth, (user) => {
        setAuthUser(user);
    })

    const authLogIn = () => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithPopup(auth, googleProvider).then((result) => {
                    setAuthUser(result.user);
                }).catch((error) => {
                    console.log("error in auth sign in: " + error)
                });
            })
            .catch((error) => {
                console.log("error setting persistance: " + error)
            });
    }

    const authLogOut = () => {
        signOut(auth).then(() => {
            setAuthUser(null);
        }).catch((error) => {
            console.log("error signing out: " + error)
        });
    }


    return (
        <AuthContext.Provider value={{ authLogIn, authLogOut, authUser }}>
            {children}
        </AuthContext.Provider>
    )
}
