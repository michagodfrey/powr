import React, {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase-config";
import uuid from "react-uuid";

// this component is the sucessor to CreateWorkout, and aims to create
// a doc with an array of exercises, those exercises will be referred to
// for successive workouts where the weight and reps are recorded
// this component works as of the last commmit 
const CreateRoutine = ({user}) => {
  const [newExercise, setNewExercise] = useState([]);
  const [routine, setRoutine] = useState("");
  const [routineNotes, setRoutineNotes] = useState("");

  const addExercise = () => {
    setNewExercise(
      newExercise.concat(
        <input
          key={uuid()}
          className="new-exercise"
          name="exercise"
          type="text"
          placeholder="Exercise"
          maxLength={30}
        />
      )
    );
  };

  const removeExercise = () => {
    setNewExercise(newExercise.slice(0, -1));
  };

  const createWorkoutRoutine = async () => {
    const exercise = document.querySelectorAll(".new-exercise");

    if (routine.length < 1) {
      alert("You must give your workout routine a name");
      return;
    }

    let tempList = [];

    for (let i = 0; i < exercise.length; i++) {
      if (exercise[i].value.length < 1) {
        exercise[i].classList.add("input-red");
        alert("Inputs cannot be blank");
        return;
      } else {
        tempList.push(exercise[i].value);
      }
    }

    await setDoc(doc(db, `users/${user.uid}`, "workouts", routine), {
      notes: routineNotes,
      exercises: [...tempList],
    });
    window.location.reload();
  };

  return (
    <div className="border">
      <h2>Create Routine Component</h2>
      <h3>Add New Routine</h3>
      <form>
        <input
          name="routine"
          type="text"
          placeholder="Workout Routine Name"
          maxLength={20}
          onChange={(event) => {
            setRoutine(event.target.value);
          }}
        />
        <textarea
          name="routine-notes"
          placeholder="Workout routine notes"
          maxLength={200}
          onChange={(event) => {
            setRoutineNotes(event.target.value);
          }}
        ></textarea>
        <h4>Workout Routine Exercises</h4>
      </form>
      <div className="flex flex-col">
        {newExercise}
        <button className="bg-primary m-4" onClick={addExercise}>
          Add Exercise
        </button>
        {newExercise.length > 0 ? (
          <>
            <button className="bg-gray text-white m-4" onClick={removeExercise}>
              Remove Exercise
            </button>
            <button
              className="bg-black text-white m-4"
              onClick={createWorkoutRoutine}
            >
              Create Workout Routine
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CreateRoutine;
