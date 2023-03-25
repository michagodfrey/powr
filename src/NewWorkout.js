import React, { useState } from "react";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "./firebase-config";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const NewWorkout = ({ user, routine, exercises }) => {
  const [exerciseData, setExerciseData] = useState({});
  // const [date, setDate] = useState(new Date());

  const handleExerciseChange = (event) => {
    const { name, value } = event.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const timestamp = Timestamp.now();
    const id = timestamp.toDate().getTime();

    await setDoc(doc(db, "users", user.uid, routine, id.toString()), {
      exerciseData,
    });

    console.log("Document written with ID: ", id.toString());

    setExerciseData({});
  };

  // <DatePicker
  //   selected={date}
  //   dateFormat="dd/MM/yyyy"
  //   maxDate={new Date()}
  //   closeOnScroll={true}
  //   onChange={(date) => setDate(date)}
  // />;

  return (
    <div>
      <p className="mb-2">Enter data from your last workout.</p>
      <ul className="pl-8">
        <li className="-translate-x-8">Tips:</li>
        <li className="list-disc">
          Be consistent with unit of measurement for weight, e.g. stick with kg
          or lb.
        </li>
        <li className="list-disc">
          Enter total reps, e.g. if you did three sets of eight reps - 24reps.
        </li>
      </ul>
      <form className="bg-gray p-4" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default NewWorkout;