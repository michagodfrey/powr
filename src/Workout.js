import React from 'react';
import { useState, useEffect } from 'react';
import Row from "./Row";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Workout = () => {
    const [ exercises, setExercises ] = useState([]);
    const exercisesCollectionRef = collection(db, "exercises")

    useEffect(() => {
        const getExercise = async () => {
            const data = await getDocs(exercisesCollectionRef);
            setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getExercise();
    }, []);

    console.log(exercises)

  return (
    <>
      <h1>Workout</h1>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
            {exercises.map((exercise) => {
                return (
                  <>
                    <div>{exercise.exercise}</div>
                    <div>{exercise.reps}</div>
                    <div>{exercise.weight}</div>
                    <div>{exercise.total}</div>
                  </>
                );
            })}
          <Row />
        </tbody>
      </table>
    </>
  );
}

export default Workout