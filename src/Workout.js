import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Workout = () => {
    const [ workouts, setWorkouts ] = useState([]);

    useEffect(() => {
      const getWorkout = async () => {
        try {
          const docRef = doc(db, "users", "hwUQMGclPZQCJUO1jgYPDnzQwZp2", "workouts", "workoutTest");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const arr = docSnap.data().exercises
            setWorkouts([...arr])
          } else {
            console.log('cannot find doc')
          }
        } catch (error) {
          console.log("rejected:", error.message);
        }
      }
      getWorkout();
    }, []);

  return (
    <>
      <h1>Workout Component</h1>
      <h2>Exercises collection data</h2>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Exercise</th>
            <th colSpan={4}>Workout 1</th>
          </tr>
          <tr>
            <th>Weight</th>
            <th>Reps</th>
            <th>Total</th>
            <th>Progress?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User sub-collection</td>
          </tr>
          {workouts.map((workout) => {
            return (
                <tr>
                  <td>{workout.exercise}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight * workout.reps}</td>
                  <td>Yes/No</td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Workout
