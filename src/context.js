import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase-config";

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