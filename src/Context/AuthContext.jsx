import React, { createContext, useState, useEffect } from 'react'
import { getAuth, signOut, signInWithRedirect, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getFirestore } from 'firebase/firestore';
export const AuthContext = createContext();


export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [userDataLoading, setUserDataLoading] = useState(true);

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
            uid: user.uid,
        }

        getDoc(userDataRef).then(snapshot => {
            if (snapshot.exists()) {
                setUserData(snapshot.data());
                setAuthLoading(false);
                setUserDataLoading(false);
            } else {
                setUserData(userObject);
                setDoc(doc(usersCollection, user?.uid), userObject).then(() => { setAuthLoading(false); setUserDataLoading(false); }).catch(e => console.log("error creating user: " + e));
            }
        }).catch(e => console.log())
    }

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
            setUserData(null)
        }).catch((error) => {
            console.log("error signing out: " + error)
        });
    }

    useEffect(() => {
        if (authUser && authUser.uid) {
            getUserData(authUser);
        }
    }, [authUser])

    return (
        <AuthContext.Provider value={{ authLogIn, authLogOut, authUser, authLoading, userData, setUserData, userDataLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
