import React, {useState} from "react";
import {db} from "./firebase-config";
import {doc, updateDoc, deleteField, arrayRemove, arrayUnion} from "firebase/firestore";
import NewWorkout from "./NewWorkout";
import RoutineRecords from "./RoutineRecords";

const Routine = ({routine, exercises, user}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);

  // add user confirmation and alert message on completion
  // this will only delete the routine array from the user doc, 
  // any saved workouts will remain but won't be displayed
  const deleteRoutine = async (routine) => {
    if (window.confirm("Are you sure you want to delete this routine? Once deleted, it will be removed from your routines list and any data associated will not be displayed.")) {
      const ref = doc(db, "users", `${user.uid}`);
      try {
        await updateDoc(ref, {
          [`routines.${routine}`]: deleteField(),
        });
      } catch (error) {
        console.log(error.message);
      }
      window.location.reload();
    } else {
      return;
    }
  };

  // add confirmation control and alert message on completion
  const deleteExercise = async (exercise) => {
    if (window.confirm("Are you sure you want to delete this exercise? Once deleted it will not appear in your routine and past data will not be displayed.")) {
      const ref = doc(db, "users", `${user.uid}`);
      try {
        await updateDoc(ref, {
          [`routines.${routine}`]: arrayRemove(exercise),
        });
      } catch (error) {
        console.log(error.message);
      }
      window.location.reload();
    } else {
      return;
    }
  }

  const addExercise = async (newExercise) => {
    const ref = doc(db, "users", `${user.uid}`);

    try {
      await updateDoc(ref, {
        [`routines.${routine}`]: arrayUnion(newExercise),
      })
    } catch (error) {
      console.log(error.message);
    }
    window.location.reload();
  }

  const handleToggleNewWorkoutForm = () => {
    setShowNewWorkoutForm((prevState) => !prevState);
  };

  return (
    <div className="p-4 border-t">
      {isEditing ? (
        <>
          <div className="flex justify-between m-2 items-center">
            <span>Caution: delete routine and edit exercises</span>
            <h2 className="text-3xl font-bold">{routine}</h2>
            <button
              className="bg-warning m-4"
              onClick={() => deleteRoutine(routine)}
            >
              Delete Routine
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center"
            >
              <img
                className="h-[25px] lg:h-[35px] mr-2 transition ease-in-out hover:scale-110"
                src={"images/cancel-svgrepo-com.svg"}
                alt="cancel icon"
              />
              End editing
            </button>
          </div>
          <ul className="flex flex-wrap items-center bg-primary p-4 text-xl">
            <li className="font-bold">Exercises:</li>
            {exercises.map((exercise, index) => (
              <li key={index} className="m-2">
                {exercise}
                <button
                  className="bg-warning ml-4"
                  onClick={() => deleteExercise(exercise)}
                >
                  delete exercise
                </button>
              </li>
            ))}
            <li>
              Add new exercise:{" "}
              <input
                type="text"
                placeholder="new exercise"
                onChange={(event) => {
                  setNewExercise(event.target.value);
                }}
              />
              <button
                className="bg-yellow"
                onClick={() => {
                  addExercise(newExercise);
                }}
              >
                Add exercise
              </button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <div className="flex justify-between m-2 items-center">
            <h2 className="text-3xl font-bold">{routine}</h2>
            <button onClick={() => setIsEditing(!isEditing)}>
              <img
                className="h-[25px] lg:h-[35px] transition ease-in-out hover:scale-110"
                src={"images/settings-gear-part-2-svgrepo-com.svg"}
                alt="gear icon"
              />
            </button>
          </div>

          <ul className="flex flex-wrap bg-white p-4 text-xl">
            <li className="font-bold">Exercises:</li>
            {exercises.map((exercise, index) => (
              <li key={index} className="mx-2">
                {index === exercises.length - 1 && exercises.length > 1
                  ? `and ${exercise}.`
                  : `${exercise},`}
              </li>
            ))}
          </ul>
          <button
            className="bg-secondary hover:bg-primaryHover font-bold text-white p-4 my-2 w-[280px]"
            type="button"
            onClick={handleToggleNewWorkoutForm}
          >
            Add New Workout
          </button>
          {showNewWorkoutForm && (
            <NewWorkout user={user} routine={routine} exercises={exercises} />
          )}
          <RoutineRecords user={user} routine={routine} exercises={exercises} />
        </>
      )}
    </div>
  );
}

export default Routine