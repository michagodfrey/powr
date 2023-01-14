import React from 'react';
import { db } from "./firebase-config";
import { doc, deleteDoc } from "firebase/firestore"; 
import uuid from "react-uuid";
import ExerciseRow from './ExerciseRow';

const WorkoutRecord = ({workout, user}) => {

  // add button and user confirmation and reload
  const deleteWorkout = async (id) => {
    try {
      await deleteDoc(doc(db, "users", `${user.uid}`, "workouts", id));
      console.log("deleted workout");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <th rowSpan={2}>Exercise</th>
          <th colSpan={3}>Workout on {`${workout.date.toString()}`}</th>
          <th>View Notes</th>
          <th colSpan={2}>
            <button onClick={() => {deleteWorkout(workout.id)}}>Delete Workout</button>
          </th>
        </tr>
        <tr>
          <th>Weight</th>
          <th>Reps</th>
          <th>Total</th>
          <th>Progress?</th>
          <th colSpan={2}>Options</th>
        </tr>
        {workout.exercises.map((exercise) => (
          <ExerciseRow key={uuid()} exercise={exercise} user={user} workout={workout} />
        ))}
      </tbody>
    </>
  );
}

export default WorkoutRecord;