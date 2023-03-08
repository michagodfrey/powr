import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import Routine from "./Routine";

// This component displays the routines created by the user
const WorkoutRoutines = ({ user }) => {
    const [allRoutines, setAllRoutines] = useState([]);

    useEffect(() => {
        const getRoutines = async () => {
            const docRef = doc(db, "users", `${user.uid}`);
            try {
                const docSnap = await getDoc(docRef);
                // console.log(docSnap.data());
                setAllRoutines(docSnap.data().routines);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRoutines();
    }, [user]);

    return (
        <div className="w-full">
            <p>Workout Routines Component</p>
            <p className="text-2xl">Routines</p>
            {Object.entries(allRoutines).map(([routine, exercises], index) => {
                return (
                    <Routine key={index} routine={routine} exercises={exercises} user={user} />
                )          
            })}
            <div></div>
        </div>
    );
}

export default WorkoutRoutines
