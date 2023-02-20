import React, {useState, useReducer} from "react";
import {db} from "./firebase-config";
import {doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";

const ExerciseRow = ({exercise, user, workout}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, updateData] = useReducer(
    (prev, next) => {
      const newData = {...prev, ...next};

      if (newData.weight <= 0 || newData.weight > 1000) {
        newData.weight = 1;
      }

      if (newData.reps <= 0 || newData.reps > 1000) {
        newData.reps = 1;
      }

      return newData;
    },
    {weight: 0, reps: 0}
  );

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
        exercises: arrayUnion({...data}),
      });
    } catch (error) {
      console.log(error.message);
    }

    setIsEditing(!isEditing);
    window.location.reload();
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

    window.location.reload();
  };

  return (
    <>
      {isEditing ? (
        <tr>
          <td className="border p-2">{exercise.exercise}</td>
          <td className="border p-2">
            <input
              name="newWeight"
              type="number"
              placeholder={exercise.weight}
              onChange={(event) => {
                updateData({...data, weight: event.target.value});
              }}
            />
          </td>
          <td className="border p-2">
            <input
              name="newReps"
              type="number"
              placeholder={exercise.reps}
              onChange={(event) => {
                updateData({...data, reps: event.target.value});
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
