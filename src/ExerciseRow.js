import React, {useState} from "react";
import {db} from "./firebase-config";
import {doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";

const ExerciseRow = ({exercise, user, workout}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [newWeight, setNewWeight] = useState(0);
  const [newReps, setNewReps] = useState(0);

  // add user confirmation. leave original value if nothing entered
  // make it change data without reload, do some sort of quality control, i.e > 0 values
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
    window.location.reload();
  };

  // add user confirmation
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

    window.location.reload();
  };

  return (
    <>
      {isEditing ? (
        <tr>
          <td className="border p-2">
            <input
              className="newExercise"
              name="newExercise"
              type="text"
              placeholder={exercise.exercise}
              onChange={(event) => {
                setNewExercise(event.target.value);
              }}
            />
          </td>
          <td className="border p-2">
            <input
              name="newWeight"
              type="number"
              placeholder={exercise.weight}
              onChange={(event) => {
                setNewWeight(event.target.value);
              }}
            />
          </td>
          <td className="border p-2">
            <input
              name="newReps"
              type="number"
              placeholder={exercise.reps}
              onChange={(event) => {
                setNewReps(event.target.value);
              }}
            />
          </td>
          <td className="border p-2">Cell</td>
          <td className="border p-2">Cell</td>
          <td className="border p-2">
            <button
              className="bg-black text-white"
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
          <td className="border p-2">
            <button
              className="bg-yellow"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td className="border p-2">{exercise?.exercise}</td>
          <td className="border p-2">{exercise?.weight}</td>
          <td className="border p-2">{exercise?.reps}</td>
          <td className="border p-2">
            {exercise.exercise ? exercise.weight * exercise.reps : "N/A"}
          </td>
          <td className="border p-2">Yes/No</td>
          <td className="border p-2">
            <button
              className="bg-warning"
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
          <td className="border p-2">
            <button
              className="bg-yellow"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default ExerciseRow;
