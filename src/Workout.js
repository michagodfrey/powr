import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const Workout = () => {
    
    const [ allWorkouts, setAllWorkouts ] = useState([])

    // get all workouts
    useEffect(() => {
      const getWorkouts = async () => {
        try {
          const snapshot = await getDocs(collection(db, "users", "hwUQMGclPZQCJUO1jgYPDnzQwZp2", "workouts"))
          let tempArr = [];
          snapshot.forEach((doc) => {
            tempArr.push({ ...doc.data() });
          })
          setAllWorkouts([...tempArr])
        } catch (error) {
          console.log(error.message)
        }
      }
      getWorkouts();
    }, []);

    const deleteWorkout = async () => {
      await deleteDoc(doc(db, "users", "hwUQMGclPZQCJUO1jgYPDnzQwZp2", "workouts", "id"));
    }

    console.log(allWorkouts)

  return (
    <>
      <h1>Read, Update & Delete Workout Component</h1>
      <table>          
          {
            allWorkouts.map((workout, index) => {
              return (
                <>
                  <tr>
                    <th rowSpan={2} onClick={deleteWorkout()}>Exercise</th>
                    <th colSpan={3}>Workout on {`${workout.date.toString()}`}</th>
                    <th>View Notes</th>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th>Total</th>
                    <th>Progress?</th>
                  </tr>
                    {workout.exercises.map((exercise) => (
                      <tr>
                        <td>{exercise?.exercise}</td>
                        <td>{exercise?.weight}</td>
                        <td>{exercise?.reps}</td>
                        <td>{exercise.weight * exercise.reps}</td>
                        <td>Yes/No</td>
                      </tr>
                    ))}
                </>
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
