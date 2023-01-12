import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { collection, getDocs, doc, updateDoc, deleteField, deleteDoc, arrayRemove, FieldValue } from "firebase/firestore";

const Workout = ({ user }) => {
    
    const [ allWorkouts, setAllWorkouts ] = useState([]);

    // const [ newExercise, setNewExercise ] = useState("");
    // const [ newWeight, setNewWeight ] = useState(0);
    // const [ newReps, setNewReps ] = useState(0);

    // get all workouts
    useEffect(() => {
      const getWorkouts = async () => {
        try {
          const snapshot = await getDocs(
            collection(db, "users", `${user.uid}`, "workouts")
          );
          let tempArr = [];
          snapshot.forEach((doc) => {
            tempArr.push({ ...doc.data(), id: doc.id });
          })
          setAllWorkouts([...tempArr])
        } catch (error) {
          console.log(error.message)
        }
      }
      getWorkouts();
    }, [user]);

    const deleteWorkout = async (id) => {
      try {    
        await deleteDoc(doc(db, "users", `${user.uid}`, "workouts", id));
        console.log('deleted workout')
      } catch (error) {
        console.log(error.message)
      }
    }

    // not working
    const deleteExercise = async (index, id) => {
      // try {
      //   const docRef = doc(db, "users", `${user.uid}`, "workouts", id);
      //   await updateDoc(docRef, { exercises: arrayRemove(index)});
      // } catch (error) {
      //   console.log(error.message);
      // }
    }

    const editExercise = async (index) => {
      // display modal with input feilds
      // set states to user inputs
      // delete array item being edited
      // push new item to array using states
    };

  return (
    <>
      <h1>Read Workout Component</h1>
      <table>          
          {
            allWorkouts.map((workout) => {
              return (
                <div key={workout.id}>
                  <button onClick={() => {deleteWorkout(workout.id)}}>Delete workout</button>
                  <tr>
                    <th rowSpan={2}>Exercise</th>
                    <th colSpan={3}>
                      Workout on {`${workout.date.toString()}`}
                    </th>
                    <th>View Notes</th>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th>Total</th>
                    <th>Progress?</th>
                    <th colSpan={2}>Options</th>
                  </tr>
                  {workout.exercises.map((exercise, index) => (
                    <tr key={index}>
                      <td>{exercise?.exercise}</td>
                      <td>{exercise?.weight}</td>
                      <td>{exercise?.reps}</td>
                      <td>{exercise.weight * exercise.reps}</td>
                      <td>Yes/No</td>
                      <td><button onClick={() => {deleteExercise(index, workout.id)}}>Delete</button></td>
                      <td><button onClick={() => {editExercise(index)}}>Edit</button></td>
                    </tr>
                  ))}
                </div>
              );
            })
          }
      </table>
      <div>
      </div>
    </>
  );
}

export default Workout
