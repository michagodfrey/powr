import React from "react";
import {db} from "./firebase-config";
import {doc, deleteDoc} from "firebase/firestore";
import uuid from "react-uuid";
import ExerciseRow from "./ExerciseRow";

const WorkoutRecord = ({workout, user}) => {
  // add button and user confirmation and reload
  const deleteWorkout = async (id) => {
    try {
      await deleteDoc(doc(db, "users", `${user.uid}`, "workouts", id));
      console.log("deleted workout");
    } catch (error) {
      console.log(error.message);
    }

    window.location.reload();
  };

  return (
    <>
      <tbody className="">
        <tr className="">
          <th rowSpan={2} className="">
            Exercise
          </th>
          <th colSpan={3} className="">
            Workout on {`${workout.date.toString()}`}
          </th>
          <th className="">View Notes</th>
          <th colSpan={2} className="0">
            <button
              onClick={() => {
                deleteWorkout(workout.id);
              }}
            >
              Delete Workout
            </button>
          </th>
        </tr>
        <tr className="">
          <th className="">Weight</th>
          <th className="">Reps</th>
          <th className="">Total</th>
          <th className="">Progress?</th>
          <th colSpan={2} className="">
            Options
          </th>
        </tr>
        {workout.exercises.map((exercise) => (
          <ExerciseRow
            key={uuid()}
            exercise={exercise}
            user={user}
            workout={workout}
          />
        ))}
      </tbody>
    </>
  );
};

export default WorkoutRecord;
