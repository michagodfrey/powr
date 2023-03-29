import React, { useState } from "react";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "./firebase-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewWorkout = ({ user, routine, exercises }) => {
  const [exerciseData, setExerciseData] = useState({});
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleShowDate = () => setShowDate(!showDate);

  const handleExerciseChange = (event) => {
    const { name, value } = event.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const id = showDate ? date.getTime() : Timestamp.now().toDate().getTime();
    
    await setDoc(doc(db, "users", user.uid, routine, id.toString()), {
      exerciseData,
    });

    setExerciseData({});
    window.location.reload();
  };

  return (
    <div>
      <p className="mb-2 underline">Enter data from your last workout.</p>
      <ul className="pl-8">
        <li className="-translate-x-8">Tips:</li>
        <li className="list-disc">
          Be consistent with unit of measurement for weight, e.g. stick with kg
          or lb.
        </li>
        <li className="list-disc">
          Enter total reps of all sets, e.g. three sets of eight reps = 24reps.
        </li>
      </ul>
      <hr className="my-4"></hr>
      <form className="border-4 p-4 shadow-md" onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center p-2 text-black">
          <p className="mr-2 text-2xl">
            <b>{routine}</b> workout on:
          </p>
          <div className="mr-2 font-bold text-xl ">
            {showDate ? (
              <DatePicker
                className="bg-primaryHover"
                selected={date}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                closeOnScroll={true}
                onChange={(date) => setDate(date)}
              />
            ) : (
              <DatePicker
                selected={date}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                closeOnScroll={true}
                onChange={(date) => setDate(date)}
                disabled
              />
            )}
          </div>
          <div className="flex items-center">
            <label>
              <input
                className="mr-2"
                type="checkbox"
                onChange={handleShowDate}
              />
              Use previous date?
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          {exercises.map((exercise, index) => (
            <fieldset key={index} className="border-2 text-black m-2 p-4">
              <p className="text-xl font-bold">{exercise}</p>
              <label htmlFor={`${exercise} weight`} className="text-[0px]">
                Weight:
              </label>
              <input
                className="bg-primaryHover text-black mr-2 p-4"
                type="number"
                name={`${exercise} weight`}
                placeholder="Weight"
                value={exerciseData[`${exercise} weight`] || ""}
                onChange={handleExerciseChange}
                required
              />
              <label htmlFor={`${exercise} reps`} className="text-[0px]">
                Reps:
              </label>
              <input
                className="bg-primaryHover teact-black p-4 my-2"
                type="number"
                name={`${exercise} reps`}
                placeholder="Total reps"
                value={exerciseData[`${exercise} reps`] || ""}
                onChange={handleExerciseChange}
                required
              />
            </fieldset>
          ))}
        </div>
        <hr className="my-4"></hr>
        <button
          className="bg-primary hover:bg-primaryHover text-xl border-2 font-bold text-black p-4 w-[280px]"
          type="submit"
        >
          Save Workout
        </button>
      </form>
    </div>
  );
};

export default NewWorkout;