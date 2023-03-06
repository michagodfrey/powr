import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import uuid from "react-uuid";

// this component adds data directly to the user doc
// this was not the original idea, but was in response the other components not working
const CreateRoutineUser = ({user}) => {
    const [newExercise, setNewExercise] = useState([]);
    const [routine, setRoutine] = useState("");
    const [routineExercises, setRoutineExercises] = useState([]);

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
            onChange={event => pushExercise(event)}
          />
        )
      );
    };

    const removeExercise = () => {
      setNewExercise(newExercise.slice(0, -1));
    };

    const pushExercise = (event) => {
      const newInputValues = [...routineExercises];
      newInputValues.push(event.target.value);
      setRoutineExercises(newInputValues);
    }

    const addRoutine = async () => {

      if (routine.length < 1) {
        alert("You must give your workout routine a name");
        return;
      }

      if (routineExercises.length < 1) {
        alert("You must add at lease one exercise to your routine");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const data = {
        routines: {
          [routine]: routineExercises,
        },
      };

      await setDoc(docRef, data, { merge: true });

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
                onClick={addRoutine}
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
