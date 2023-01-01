import React from 'react';
import { useState, useEffect } from 'react';
// import Row from "./Row";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query } from "firebase/firestore";

const Workout = () => {
    const [ exercises, setExercises ] = useState([]);
    const [ newExercise, setNewExercise ] = useState("");
    const [ newReps, setNewReps ] = useState(0);
    const [ newWeight, setNewWeight ] = useState(0);
    const exercisesCollectionRefEx = collection(
      db,
      "exercises"
    );

    const [ workouts, setWorkouts ] = useState([]);
    

    const addExercise = async () => {
        await addDoc(exercisesCollectionRefEx, { exercise: newExercise, reps: Number(newReps), weight: Number(newWeight) });
    }

    const updateReps = async (id, reps) => {
        const userDoc = doc(db, "exercises", id);
        const newReps = {reps: reps + 1}
        await updateDoc(userDoc, newReps)
    }

    const deleteExercise = async (id) => {
        const userDoc = doc(db, "exercises", id);
        await deleteDoc(userDoc);
    }

    useEffect(() => {
        const getExercise = async () => {
          try {
            const data = await getDocs(exercisesCollectionRefEx)
            setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          } catch (error) {
            console.log("rejected", error.message)
          }
        }
        getExercise();
    }, []);

    useEffect(() => {
      const getWorkout = async () => {
        try {
          const q = query(collection(db, "workout"));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(), id: doc.id
          }))
          data.map(async (elem) => {
            const workoutQuery = query(collection(db, `workout/${elem.id}/exercises`))
            const workoutDetails = await getDocs(workoutQuery);
            const workoutInfo = workoutDetails.docs.map((doc) => ({
              ...doc.data(), id: doc.id
            }))
            console.log(workoutInfo)
            setWorkouts(workoutInfo)
          })

        } catch (error) {
          console.log("rejected", error.message);
        }
      }
      getWorkout();
    }, []);

  return (
    <>
      <h1>Workout Component</h1>
      <input
        placeholder="exercise"
        onChange={(event) => {
          setNewExercise(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="reps"
        onChange={(event) => {
          setNewReps(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="weight"
        onChange={(event) => {
          setNewWeight(event.target.value);
        }}
      />
      <button onClick={addExercise}>Add exercise</button>
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
            <th>PO</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <tr key={exercise.id}>
                <td>{exercise.exercise}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.reps * exercise.weight}</td>
                <td>Yes/No</td>
              </tr>
            );
          })}
          <tr>
            <td>Sub collection</td>
          </tr>
          {workouts.map((workout) => {
            return (
              <tr>
                <td>{workout.exercise}</td>
                <td>{workout.weight}</td>
                <td>{workout.reps}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Workout
