import React, { useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import uuid from "react-uuid";

// this component was created to add the routine data directly to the user doc
// this was not the original idea, but was in response the other components not working
// so far, I cannot see how to add new maps with custom names
const CreateRoutineUser = ({user}) => {
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

    const createUserWorkoutRoutine = async () => {
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
      // this function does upload data to firebase, but I don't know how to create
      // maps with custom names, it will simply overwrite data.
      await updateDoc(doc(db, `users/${user.uid}`), {
        
        routines: routine,
        exercises: [...tempList],
        notes: routineNotes
      });

      window.location.reload();
    };

    return (
      <div className="bg-gray">
        <h2>Create Routine in User Doc Component</h2>
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
              <button
                className="bg-gray text-white m-4"
                onClick={removeExercise}
              >
                Remove Exercise
              </button>
              <button
                className="bg-black text-white m-4"
                onClick={createUserWorkoutRoutine}
              >
                Create Workout Routine
              </button>
            </>
          ) : null}
        </div>
      </div>
    );
}

export default CreateRoutineUser
