import React, {useState} from 'react';
import { db } from "./firebase-config";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const ExerciseRow = ({exercise, user, workout}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newExercise, setNewExercise] = useState("");
    const [newWeight, setNewWeight] = useState(0);
    const [newReps, setNewReps] = useState(0);

// add user confirmation. reload after edit
const editExercise = async (id, exercise, weight, reps) => {
    
    const docRef = doc(db, "users", `${user.uid}`, "workouts", id);
    try {
      await updateDoc(docRef, {
        exercises: arrayRemove({
          exercise: exercise,
          weight: weight,
          reps: reps,
        }),
      });
      await updateDoc(docRef, {
        exercises: arrayUnion({
          exercise: newExercise,
          weight: newWeight,
          reps: newReps,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }

    setIsEditing(!isEditing);
};

  // add user confirmation, reload after edit
  const deleteExercise = async (id, exercise, weight, reps) => {
    const docRef = doc(db, "users", `${user.uid}`, "workouts", id);
    try {
      await updateDoc(docRef, {
        exercises: arrayRemove({
          exercise: exercise,
          weight: weight,
          reps: reps,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isEditing ? (
        <tr>
          <td>
            <input
              className="newExercise"
              name="newExercise"
              type="text"
              placeholder={exercise.exercise}
              onChange={((event) => {setNewExercise(event.target.value)})}
            />
          </td>
          <td>
            <input
              className="newWeight"
              name="newWeight"
              type="number"
              placeholder={exercise.weight}
              onChange={((event) => {setNewWeight(event.target.value)})}
            />
          </td>
          <td>
            <input
              className="newReps"
              name="newReps"
              type="number"
              placeholder={exercise.reps}
              onChange={((event) => {setNewReps(event.target.value)})}
            />
          </td>
          <td>Cell</td>
          <td>Cell</td>
          <td><button onClick={() => {setIsEditing(!isEditing)}}>Cancel</button></td>
          <td>
            <button
              onClick={() => {
                  editExercise(
                    workout.id,
                    exercise.exercise,
                    exercise.weight,
                    exercise.reps
                  );
              }}
            >
              Update
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{exercise?.exercise}</td>
          <td>{exercise?.weight}</td>
          <td>{exercise?.reps}</td>
          <td>{exercise.weight * exercise.reps}</td>
          <td>Yes/No</td>
          <td>
            <button
              onClick={() => {
                deleteExercise(
                  workout.id,
                  exercise.exercise,
                  exercise.weight,
                  exercise.reps
                );
              }}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              onClick={() => {setIsEditing(!isEditing)}}
            >
              Edit
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default ExerciseRow;