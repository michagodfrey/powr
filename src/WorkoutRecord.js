import React from "react";
import {db} from "./firebase-config";
import {doc, deleteDoc} from "firebase/firestore";
import uuid from "react-uuid";
import ExerciseRow from "./ExerciseRow";

const WorkoutRecord = ({workout, user}) => {
  // add user confirmation
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
      <tbody>
        <tr className="">
          <th rowSpan={2} className="border bg-secondary text-white">
            Exercise
          </th>
          <th colSpan={3} className="border bg-secondary text-white">
            Workout on {`${workout.date.toString()}`}
          </th>
          <th className="border bg-secondary text-white">View Notes</th>
          <th colSpan={2} className="border bg-secondary text-white">
            <button
              className="bg-warning"
              onClick={() => {
                deleteWorkout(workout.id);
              }}
            >
              Delete Workout
            </button>
          </th>
        </tr>
        <tr className="">
          <th className="border bg-secondary text-white">Weight</th>
          <th className="border bg-secondary text-white">Reps</th>
          <th className="border bg-secondary text-white">Total</th>
          <th className="border bg-secondary text-white">Progress?</th>
          <th colSpan={2} className="border bg-secondary text-white">
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
