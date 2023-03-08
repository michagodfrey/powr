import React from "react";
// import {db} from "./firebase-config";
// import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import AddWorkout from "./AddWorkout";
// import Workout from"./Workout";

const Routine = ({routine, exercises, user}) => {

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
        <div>Routine: {routine}</div>
        <ul>
          {exercises.map((exercise) => {
            return (
              <li key={exercise.toString()}>
                {exercise}
                {/* <button className="bg-warning m-4">Delete Exercise</button> */}
              </li>
            );
          })}
        </ul>
        <button className="bg-warning m-4" onClick={deleteRoutine}>
          Delete Routine
        </button>
        <AddWorkout routine={routine} exercises={exercises} user={user} />
      </div>
    );
}

export default Routine
