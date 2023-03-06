import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
// import CreateRoutine from "./CreateRoutine";
import Routine from "./Routine";

// This component is not working
const WorkoutRoutines = ({ user }) => {
    const [allRoutines, setAllRoutines] = useState([]);

    useEffect(() => {
        const getRoutines = async () => {
            try {
                const docRef = doc(db, "users", `${user.uid}`);
                const docSnap = await getDoc(docRef);
                setAllRoutines(docSnap.data().routines);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRoutines();
    }, [user])

    console.log(allRoutines)

    // all routines cannot be displayed like this
    return (
        <div className="w-full">
            <p>Workout Routines Component</p>
            {/* <CreateRoutine user={user} /> */}
            <p className="text-2xl">Routines</p>
            {/* <Routine user={user} /> */}
            {allRoutines.map(routine => {
                return (
                <Routine user={user} />
                );
            })}
        </div>
    );
}

export default WorkoutRoutines
