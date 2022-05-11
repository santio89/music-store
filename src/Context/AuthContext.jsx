import React, { createContext, useState, useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();


export default function AuthContextProvider({children}) {
/*     const [authCredential, setAuthCredential] = useState(null);
    const [authToken, setAuthToken] = useState(null); */
    const [authUser, setAuthUser] = useState(null);
    
    const authLogIn = ()=>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
    
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
              /*   setAuthCredential(GoogleAuthProvider.credentialFromResult(result));
                setAuthToken(GoogleAuthProvider.credentialFromResult(result).accessToken); */
                // The signed-in user info.
                setAuthUser(result.user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log("authentication error: "+error)
              
                // The AuthCredential type that was used.
              /*   setAuthCredential(GoogleAuthProvider.credentialFromError(error)); */
                // ...
            });
    }

    useEffect(()=>{
        console.log(authUser)
    }, [authUser])
    
    return (
        <AuthContext.Provider value={{authLogIn, authUser}}>
            {children}
        </AuthContext.Provider>
    )
}
