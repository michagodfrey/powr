import React from "react";
// import {db} from "./firebase-config";
// import {doc, deleteDoc, updateDoc} from "firebase/firestore";
// import AddWorkout from "./AddWorkout";
// import Workout from"./Workout";

// When supporting components are in place, this component displays a single routine
// i.e. name of routine (id) exercises array and notes
// Delete routine function works, but cannot yet delete individual exercises
// routine.workout1 and Workout below are attempts to render reps and weight data
// which I could not get to work
const Routine = ({routine, user}) => {

    // delete entire routine 
    const deleteRoutine = async () => {
        alert('disabled for production')
        // try {
        // await deleteDoc(
        //     doc(db, "users", `${user.uid}`, "workouts", `${routine.id}`)
        // );
        // console.log("deleted routine");
        // } catch (error) {
        // console.log(error.message);
        // }
        // window.location.reload();
    };

    // this deletes entire array of exercises, want it to delete single elements in the array
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
        <div className="border">
            <h3 className="font-bold">Routine Component</h3>
            {/* <div>Name: {routine?.id}</div> */}
            {/* <div>Notes: {routine?.notes}</div> */}
            <ul>
                {/* {routine?.exercises.map((exercise) => {
                return (
                    <li key={exercise.toString()}>
                    {exercise}
                    <button className="bg-warning m-4">Delete Exercise</button>
                    </li>
                );
                })} */}
            </ul>
            {/* <ul>
                {routine.workout1.map(data => {
                return (
                    <li>{data}</li>
                )
            })}
            </ul> */}
            {/* <AddWorkout routine={routine} user={user} /> */}
            {/* {allWorkouts.map((workout) => {
                return (
                <>
                    <Workout key={workout.id} workout={workout} user={user} />
                    
                </>
                );
            })} */}
            {/* <button className="bg-warning m-4" onClick={deleteRoutine}>
                Delete Routine
            </button> */}
        </div>
    );
}

export default Routine
