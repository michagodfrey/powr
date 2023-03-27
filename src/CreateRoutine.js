import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const CreateRoutineUser = ({ user, allRoutines }) => {
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

    if (Object.keys(allRoutines).includes(routineName)) {
      alert("A routine with that name already exists");
      return;
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
      <h2 className="text-2xl font-bold">Create a new routine</h2>
      <p className="mb-2">
        Give your workout routine a name and list the exercises that you will
        train to progressive overload.
      </p>
      <form className="bg-gray p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="routineName" className="text-lg font-bold">
            Workout Routine:
          </label>
          <input
            className="p-4 mb-8 w-full max-w-[600px]"
            placeholder="New routine name"
            type="text"
            id="routineName"
            value={routineName}
            onChange={handleNameChange}
            required
          />
        </div>
        <hr></hr>
        <p className="text-lg font-bold">Workout Exercises:</p>
        <div className="flex flex-wrap">
          {exercises.map((exercise, index) => (
            <div key={index} className="w-[300px] flex items-center">
              <label className="text-[0px]" htmlFor={`exercise${index}`}>
                Exercise {index + 1}:
              </label>
              <input
                className="new-exercise p-4 my-2"
                placeholder={`Exercise ${index + 1}`}
                type="text"
                id={`exercise${index}`}
                value={exercise}
                onChange={(event) => handleExerciseChange(index, event)}
                required
              />
              {index > 0 ? (
                <button
                  className="bg-warning hover:bg-yellow text-white w-[56px] h-[56px] flex justify-center items-center"
                  type="button"
                  onClick={() => handleDeleteExercise(index)}
                >
                  <img
                    src="images/trash-2-svgrepo-com.svg"
                    alt="delete exercise input icon"
                  />
                </button>
              ) : (
                <button
                  className="opacity-25 bg-warning text-white w-[56px] h-[56px] flex justify-center items-center"
                  disabled
                >
                  <img
                    src="images/trash-2-svgrepo-com.svg"
                    alt="delete exercise input icon"
                  />
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
        <hr></hr>
        <button
          className="bg-secondary font-bold text-white p-4 my-4 w-[300px]"
          type="submit"
        >
          Save Routine
        </button>
      </form>
    </div>
  );
};

export default CreateRoutineUser;