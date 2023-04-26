import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, googleProvider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const [user, setUser] = useState({});



    useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    }, []);

    return <GlobalContext.Provider value={{user}}>{children}</GlobalContext.Provider>
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}