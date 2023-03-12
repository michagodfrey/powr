import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import uuid from "react-uuid";

const CreateRoutineUser = ({ user }) => {
  const [newExercise, setNewExercise] = useState([]);
  const [routine, setRoutine] = useState("");
  const [routineExercises, setRoutineExercises] = useState([]);

  // this function works poorly and would make a bad UX as is. 
  const addExercise = () => {
    const id = uuid();
    setNewExercise(
      newExercise.concat(
        <div key={id} className="flex items-center">
          <input
            className="new-exercise p-4 ml-2 my-2 w-[280px]"
            name="exercise"
            type="text"
            placeholder="Exercise"
            maxLength={30}
            onChange={(event) => pushExercise(event)}
          />
          {/* the button below does not work as intended. Set input to w-[220px] if you get it working */}
          {/* <button
            className=" text-warning text-2xl bg-lightGray px-4 py-3 w-[60px]"
            onClick={() => removeExercise(id)}
          >
            &#10008;
          </button> */}
        </div>
      )
    );
  };

  const removeExercise = (id) => {
    // this will delete the target input and all subsequent inputs
    // setNewExercise(newExercise.filter((exercise) => exercise.id !== id));

    // this doesn't work properly
    setNewExercise(newExercise.slice(0, -1));
  };

  // this is pushing everything typed
  const pushExercise = (event) => {
    const exercises = [...routineExercises];
    exercises.push(event.target.value);
    setRoutineExercises(exercises);
  };

  // add check to make sure routine name is unique to the user
  const addRoutine = async () => {
    if (routine.length < 1) {
      alert("You must give your workout routine a name");
      return;
    }

    if (routineExercises.length < 1) {
      alert("You must add at least one exercise to your routine");
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
    <div className="p-4">
      <h2 className="text-2xl font-bold ml-2">Create a new routine</h2>
      <div className="flex flex-col">
        <div className="ml-2">
          <input
            className="p-4 mr-2"
            name="routine"
            type="text"
            placeholder="New routine name"
            maxLength={20}
            onChange={(event) => {
              setRoutine(event.target.value);
            }}
          />
          {newExercise.length > 0 ? (
            <button
              className="bg-secondary font-bold text-white p-4 my-4 w-[280px]"
              onClick={addRoutine}
            >
              Create Routine
            </button>
          ) : (
            <button className="bg-secondary cursor-default opacity-50 font-bold text-white p-4 my-4 w-[280px]">
              Create Routine
            </button>
          )}
        </div>
        <h3 className="text-xl ml-2">Add Exercises:</h3>
        <div className="flex flex-wrap">
          {newExercise}
          <input
            className="new-exercise p-4 ml-2 my-2"
            name="exercise"
            type="text"
            placeholder="Exercise"
            maxLength={30}
            onChange={(event) => pushExercise(event)}
          />
          {newExercise.length > 0 ? (
            <div className="w-[280px] border">
              <button
                className="bg-warning hover:bg-yellow p-4 m-2 text-white font-bold w-2/5"
                onClick={removeExercise}
              >
                -
              </button>
              <button
                className="bg-primary hover:bg-primaryHover m-2 font-bold text-black p-4 w-2/5"
                onClick={addExercise}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="bg-primary hover:bg-primaryHover font-bold text-black p-4 my-2 ml-2 w-[280px]"
              onClick={addExercise}
            >
              Add Exercise
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRoutineUser;
