import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import CreateRoutine from "./CreateRoutine";
import Routine from "./Routine";

// This component displays the routines
const WorkoutRoutines = ({ user }) => {
    const [allRoutines, setAllRoutines] = useState([]);

    useEffect(() => {
        const getRoutines = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "users", `${user.uid}`, "workouts")
                );
                let tempArr = [];
                snapshot.forEach((doc) => {
                    tempArr.push({...doc.data(), id: doc.id});
                });
                setAllRoutines([...tempArr]);
            } catch (error) {
                console.log(error.message);
            }
        };
        getRoutines();
    }, [user]);

    console.log(allRoutines)

    return (
        <div className="w-full">
            <p>Workout Routines Component</p>
            <CreateRoutine user={user} />
            <p className="text-2xl">Routines</p>
            {allRoutines.map(routine => {
                return (
                <Routine key={routine.id} routine={routine} user={user} />
                );
            })}
        </div>
    );
}

export default WorkoutRoutines
