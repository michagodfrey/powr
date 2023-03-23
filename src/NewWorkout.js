import React, { useState } from "react";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "./firebase-config";

const NewWorkout = ({ user, routine, exercises }) => {
    const [exerciseData, setExerciseData] = useState({});

    const handleExerciseChange = (event) => {
        const { name, value } = event.target;
        setExerciseData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
    };

    console.log(exerciseData)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const timestamp = Timestamp.now();
        const id = timestamp.toDate().getTime();

        await setDoc(
            doc(db, "users", user.uid, routine, id.toString()),
            {
                exerciseData,
            }
        );

        console.log("Document written with ID: ", id.toString());

        setExerciseData({});
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          {exercises.map((exercise, index) => (
            <fieldset key={index} className="border bg-primary m-2 p-4">
              <p className="text-xl font-bold">{exercise}</p>
              <label htmlFor={`${exercise} weight`} className="text-[0px]">
                Weight:
              </label>
              <input
                className="p-4"
                type="number"
                name={`${exercise} weight`}
                placeholder="Weight"
                value={exerciseData[`${exercise} weight`] || ""}
                onChange={handleExerciseChange}
              />
              <label htmlFor={`${exercise} reps`} className="text-[0px]">
                Reps:
              </label>
              <input
                className="p-4 ml-2 my-2"
                type="number"
                name={`${exercise} reps`}
                placeholder="Total reps"
                value={exerciseData[`${exercise} reps`] || ""}
                onChange={handleExerciseChange}
              />
            </fieldset>
          ))}
        </div>
        <button
          className="bg-secondary font-bold text-white p-4 my-4 w-[280px]"
          type="submit"
        >
          Save Workout
        </button>
      </form>
    );
};

export default NewWorkout;