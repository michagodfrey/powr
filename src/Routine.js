import React from 'react';
import {db} from "./firebase-config";
import {doc, deleteDoc} from "firebase/firestore";
import AddWorkout from "./AddWorkout";
// import Workout from"./Workout";


const Routine = ({routine, user}) => {

    const deleteRoutine = async () => {
        try {
            await deleteDoc(doc(db, "users", `${user.uid}`, "workouts", `${routine.id}`));
            console.log("deleted routine")
        } catch (error) {
            console.log(error.message)
        }
        window.location.reload();
    }

    // this deletes entire array
    // const deleteExercise = async (exercise) => {
    //     const ref = doc(db, "users", `${user.uid}`, "workouts", `${routine.id}`)
    //     try {
    //         await updateDoc(ref, {
    //             exercises: arrayRemove(exercise)
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (
        <div className="border" key={routine.id}>
            <div>Name: {routine?.routine}</div>
            <div>Notes: {routine?.notes}</div>
            <ul>
            {routine?.exercises.map((exercise) => {
                return (<li key={exercise.toString()}>
                        {exercise}
                        <button className="bg-warning m-4">Delete Exercise</button>
                        </li>)
            })}
            </ul>
            <AddWorkout routine={routine} user={user} />
            {/* {allWorkouts.map(workout => {
                return (
                <>
                    <Workout key={workout.id} />
                </>
                );
            })} */}
            <button className="bg-warning m-4" onClick={deleteRoutine}>Delete Routine</button>
        </div>
    );
}

export default Routine
