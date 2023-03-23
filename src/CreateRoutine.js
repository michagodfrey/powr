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

    const exerciseInputs = document.querySelectorAll(".new-exercise");

    for (let i = 0; i < exerciseInputs.length; i++) {
      if (exerciseInputs[i].value === "") {
        alert("Please remove empty inputs");
        return;
      }
    }

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
      <h2 className="text-2xl font-bold mb-2 font-mono">Create a new routine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="routineName" className="text-[0px]">
            Routine:
          </label>
          <input
            className="p-4 mb-8 w-full max-w-[600px]"
            placeholder="New routine name"
            type="text"
            id="routineName"
            value={routineName}
            onChange={handleNameChange}
          />
        </div>
        <hr></hr>
        <div className="flex flex-wrap">
          {exercises.map((exercise, index) => (
            <div key={index} className="w-[300px] flex items-center">
              <label className="text-[0px]" htmlFor={`exercise${index}`}>Exercise {index + 1}:</label>
              <input
                className="new-exercise p-4 my-2"
                placeholder={`Exercise ${index + 1}`}
                type="text"
                id={`exercise${index}`}
                value={exercise}
                onChange={(event) => handleExerciseChange(index, event)}
              />
              {index > 0 && (
                <button
                  className="bg-warning hover:bg-yellow text-white font-bold ml-2"
                  type="button"
                  onClick={() => handleDeleteExercise(index)}
                >
                  <img src="images/trash-2-svgrepo-com.svg" alt="delete exercise input icon" />
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-primary hover:bg-primaryHover font-bold text-black p-4 my-2 w-[300px]"
            type="button"
            onClick={handleAddExercise}
          >
            Add exercise
          </button>
        </div>
        {routineName.length < 1 ? (
          <button
            className="opacity-25 bg-secondary font-bold text-white p-4 my-4 w-[300px]"
            type="submit"
            disabled
          >
            Save Routine
          </button>
        ) : (
          <button
            className="bg-secondary font-bold text-white p-4 my-4 w-[300px]"
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
