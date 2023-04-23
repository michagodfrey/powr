import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Avatar, Typography } from '@mui/material'

const Account = ({ user }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", `${user.uid}`);

        const docSnap = await getDoc(docRef);
        
        setUserData(docSnap.data())
      } catch (error) {
        console.log(error.message);
      }
    }

    getUserData();
  }, [user]);

  return (
    <main className="items-center flex flex-col grow min-h-[calc(100vh-192px)] bg-white dark:bg-black transition-colors">
      <Typography component="h1" variant="h5">
        Account
      </Typography>
      <Avatar />
      <p>Email: {userData.email}</p>
      <p>Sign in method: {userData.signInMethod}</p>
    </main>
  );
}

export default Account