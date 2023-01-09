import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const Workout = ({ user }) => {
    
    const [ allWorkouts, setAllWorkouts ] = useState([]);

    const [ newExercise, setNewExercise ] = useState("");
    const [ newWeight, setNewWeight ] = useState(0);
    const [ newReps, setNewReps ] = useState(0);

    // get all workouts
    useEffect(() => {
      const getWorkouts = async () => {
        try {
          const snapshot = await getDocs(
            // must alter to take user.uid
            collection(db, "users", "hwUQMGclPZQCJUO1jgYPDnzQwZp2", "workouts")
          );
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

    // need to sort doc id
    const editWorkout = async (id) => {
      console.log(id)
    }

    // need to alter to accept workout id
    const deleteWorkout = async (id) => {
      console.log(id)
      try {    
        await deleteDoc(
          doc(
            db,
            "users",
            "hwUQMGclPZQCJUO1jgYPDnzQwZp2",
            "workouts",
            id
          )
        );
        console.log('deleted')
      } catch (error) {
        console.log(error.message)
      }
      
    }

    // console.log(user.uid)

  return (
    <>
      <h1>Read Workout Component</h1>
      <table>          
          {
            allWorkouts.map((workout, index) => {
              return (
                <div key={index}>
                  <button onClick={() => {deleteWorkout(index)}}>Delete workout</button>
                  <button onClick={() => {editWorkout(index)}}>Edit Workout</button>
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
