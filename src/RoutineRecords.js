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
        <div className="bg-white">
            This is the RoutineRecords Component
            <table className="flex">
            {workouts.map((workout, index) => {
                return <Workout key={workout.id} workout={workout} exercises={exercises} prevWorkout={index > 0 ? workouts[index - 1] : null} />;
            })}
            </table>
        </div>
    );
}

export default RoutineRecords
