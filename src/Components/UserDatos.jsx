import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/css/UserDatos.css'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../Context/AuthContext'
import PuffLoader from "react-spinners/PuffLoader";
import { doc, setDoc, collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UserDatos() {
    const { userData, setUserData, authLogIn, authUser, isLoggedIn, authLoading } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveConfirm, setSaveConfirm] = useState(false);
    const history = useNavigate();

    const storage = getStorage();
    const profilePicRef = ref(storage, `userProfilePics/profilePic${userData.uid}`);

    const [name, setName] = useState(userData?.name || "");
    const [phone, setPhone] = useState(userData?.phone || "");
    const [address, setAddress] = useState(userData?.address || "");
    const [profilePic, setProfilePic] = useState(userData?.profilePic || "");
    const [picUpload, setPicUpload] = useState(null);

    const resetInputs = () => {
        setName(userData?.name);
        setPhone(userData?.phone);
        setAddress(userData?.address);
        setProfilePic(userData?.profilePic);
    }

    const toggleEditMode = () => {
        setEditMode(editMode => !editMode)
    }

    const saveData = () => {
        setSaveLoading(true);
        const database = getFirestore();
        const usersCollection = collection(database, "users");
        const userObject = {
            ...userData,
            name: name,
            phone: phone,
            address: address,
            profilePic: profilePic,
        }

        if (picUpload) {
            uploadBytes(profilePicRef, picUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                       setProfilePic(url);
                       setDoc(doc(usersCollection, userData.uid), {...userObject, profilePic: url}, { merge: true }).then(() => { setUserData(userObject); setSaveLoading(false); setEditMode(false); setSaveConfirm(true); setTimeout(() => setSaveConfirm(false), 4000) }).catch(e => console.log("error saving data: " + e));
                    }).catch((e) => {
                        console.log("error retrieving data: ", e)
                    });
            }).catch(e=>console.log("error uploading data: ", e));
        } else{
            setDoc(doc(usersCollection, userData.uid), userObject, { merge: true }).then(() => { setUserData(userObject); setSaveLoading(false); setEditMode(false); setSaveConfirm(true); setTimeout(() => setSaveConfirm(false), 4000) }).catch(e => console.log("error saving data: " + e));
        }
    }

    useEffect(() => {
        setName(userData?.name);
        setPhone(userData?.phone);
        setAddress(userData?.address);
        setProfilePic(userData?.profilePic);
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='DatosWrapper'>
            {authLoading ? <PuffLoader color={"var(--color-one)"} loading={authLoading} size={200} speedMultiplier={1.2} /> : <AnimatePresence>
                <motion.div className='Datos' key={"Datos"} initial={{ x: "-120%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "120%" }}
                    transition={{ type: 'tween', duration: .4, ease: "easeInOut" }}>
                    <button onClick={() => { history(-1) }} className='Datos__back'><i className="bi bi-caret-left-fill"></i></button>
                    <h1 className='Datos__title'>Mis Datos</h1>

                    {isLoggedIn || authUser ? <div className='Datos__details'>

                        <form onSubmit={(e) => { e.preventDefault(); editMode && saveData(); }}>
                            {authLoading ? <PuffLoader color={"var(--color-one)"} loading={authLoading} size={200} speedMultiplier={1.2} /> : <>
                                <div className='Datos__details__pWrapper'>
                                    <p>·&nbsp;Foto de perfil:<br /><span><img className={editMode ? "is-edit" : ""} alt='profilePic' src={profilePic}></img>{editMode && <label>&nbsp;<i className="bi bi-upload" aria-label="cargar imagen" title="Cargar Imagen"></i> <input type="file" name="profilepic" accept="image/png, image/jpeg"
                                        onChange={(e) => {
                                            setProfilePic(URL.createObjectURL(e.currentTarget.files[0]))
                                            setPicUpload(e.currentTarget.files[0]);
                                        }} /></label>}</span></p>

                                    <p>·&nbsp;Nombre Completo:<br /><span>{editMode ? <input type="text" value={name} maxLength={200} pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange={(e) => { setName(e.currentTarget.value) }} /> : userData?.name}</span></p>

                                    <p>·&nbsp;Teléfono:<br /><span>{editMode ? <input type="tel" name='phone' value={phone} pattern="[0-9]{6,20}" maxLength={40} onChange={(e) => { setPhone(e.currentTarget.value) }} /> : userData?.phone}</span></p>

                                    <p>·&nbsp;Dirección:<br /><span>{editMode ? <input type="text" name='address' value={address} maxLength={200} onChange={(e) => { setAddress(e.currentTarget.value) }} /> : userData?.address}</span></p>

                                    <p>·&nbsp;E-Mail:<br /><span className='userEmail'>{userData?.email}</span></p>

                                </div>
                                <div className='Datos__details__btnContainer'>
                                    <button type='button' onClick={() => { if (editMode) { resetInputs() }; toggleEditMode() }} className="button is-danger is-size-5 Datos__details__btnContainer__btn">{editMode ? "Cancelar" : "Editar"}</button>

                                    <button type='submit' className="button is-danger is-size-5 Datos__details__btnContainer__btn">{saveLoading ? <PuffLoader color={"var(--color-three)"} size={30} speedMultiplier={1.2} /> : (saveConfirm ? "Guardado!" : "Guardar")}</button>
                                </div>
                            </>
                            }
                        </form>
                    </div> : <div className='Datos__nouser'><p>Debes&nbsp;<button onClick={() => authLogIn()}>Iniciar Sesión</button>&nbsp;para ver tus datos</p></div>}
                </motion.div>
            </AnimatePresence>}
        </div >
    )
}
