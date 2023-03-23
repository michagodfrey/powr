import React, {useState, useEffect} from 'react';
import {db} from "./firebase-config";
import {collection, getDocs} from "firebase/firestore";
import Workout from "./Workout";

const RoutineRecords = ({user, routine, exercises}) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const getWorkouts = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "users", `${user.uid}`, routine)
                );
                let tempArr = [];
                snapshot.forEach(doc => {
                    tempArr.push({...doc.data(), id: doc.id});
                });
                setWorkouts([...tempArr]);
            } catch (error) {
                console.log(error.message);
            }
        };
        getWorkouts();
    }, [user, routine]);

    return (
        <div className="h-[calc(100vh-30rem)] bg-white">
            This is the RoutineRecords Component
            <table className="flex">
            {workouts.map((workout) => {
                return <Workout key={workout.id} workout={workout} exercises={exercises} user={user} />;
            })}
            </table>
        </div>
    );
}

export default RoutineRecords
