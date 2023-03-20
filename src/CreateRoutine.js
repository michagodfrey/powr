import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const CreateRoutineUser = ({ user }) => {
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState([""]);

  const handleNameChange = (event) => {
    setRoutineName(event.target.value);
  };

  const handleExerciseChange = (index, event) => {
    const newExercises = [...exercises];
    newExercises[index] = event.target.value;
    setExercises(newExercises);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, ""]);
  };

  const handleDeleteExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // add control for empty exercise inputs

    const docRef = doc(db, "users", user.uid);
    const data = {
      routines: {
        [routineName]: exercises,
      },
    };

    await setDoc(docRef, data, { merge: true });

    window.location.reload();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold ml-2">Create a new routine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="routineName" className="m-2 text-lg">
            Routine:&nbsp;{" "}
          </label>
          <input
            className="p-4 mr-2 mb-2"
            placeholder="New routine name"
            type="text"
            id="routineName"
            value={routineName}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-wrap ml-2">
          {exercises.map((exercise, index) => (
            <div key={index}>
              <label htmlFor={`exercise${index}`}>Exercise {index + 1}:</label>
              <input
                className="new-exercise p-4 ml-2 my-2"
                placeholder="Exercise"
                type="text"
                id={`exercise${index}`}
                value={exercise}
                onChange={(event) => handleExerciseChange(index, event)}
              />
              {index > 0 && (
                <button
                  className="bg-warning hover:bg-yellow p-4 m-2 text-white font-bold"
                  type="button"
                  onClick={() => handleDeleteExercise(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-primary hover:bg-primaryHover font-bold text-black p-4 my-2 ml-2 w-[280px]"
            type="button"
            onClick={handleAddExercise}
          >
            Add Exercise
          </button>
        </div>
        {routineName.length < 1 ? (
          <button
            className="bg-gray font-bold text-white p-4 my-4 w-[280px]"
            type="submit"
            disabled
          >
            Save Routine
          </button>
        ) : (
          <button
            className="bg-secondary font-bold text-white p-4 my-4 w-[280px]"
            type="submit"
          >
            Save Routine
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateRoutineUser;
