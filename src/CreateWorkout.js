import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exercise from "./Exercise";

const CreateWorkout = ({ user }) => {
  const [exerciseComponent, setExerciseComponent] = useState([]);
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  // add new exercise input field
  const addExerciseComponent = () => {
    setExerciseComponent(
      exerciseComponent.concat(
        <Exercise
          key={exerciseComponent.length}
          removeExerciseComponent={removeExerciseComponent}
        />
      )
    );
  };

  // this is not working
  const removeExerciseComponent = (key) => {
    console.log(key);
    setExerciseComponent(exerciseComponent.filter((item) => item.key !== key));
  };

  const handleSubmit = async () => {
    // push execise data to array for quick access or find some other way to auto fil on subsequent workouts
    const exercise = document.querySelectorAll(".exercise");
    const weight = document.querySelectorAll(".weight");
    const reps = document.querySelectorAll(".reps");

    let tempList = [];

    for (let i = 0; i < exercise.length; i++) {
      if (exercise[i].value.length === 0) {
        alert("Exercise field cannot be blank");
        break;
      }

      if (exercise[i].value.length > 30) {
        exercise[i].value = exercise[i].value.substring(0, 30);
      }

      if (weight[i].value <= 0 || weight[i].value > 1000) {
        weight[i].value = 1;
      }

      if (reps[i].value <= 0 || reps[i].value > 1000) {
        reps[i].value = 1;
      }

      tempList.push({
        exercise: exercise[i].value,
        weight: weight[i].value,
        reps: reps[i].value,
      });
    }

    await addDoc(collection(db, `users/${user.uid}/workouts`), {
      date: startDate,
      notes: workoutNotes,
      exercises: [...tempList],
    });

    window.location.reload();
  };

  return (
    <div>
      <h1>Create Workout component</h1>
      <h2>Add new workout</h2>
      <form>
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          closeOnScroll={true}
          onChange={(date) => setStartDate(date)}
        />
        <textarea
          name="notes"
          placeholder="Workout notes"
          maxLength={200}
          onChange={(event) => {
            setWorkoutNotes(event.target.value);
          }}
        ></textarea>
        <h3>Exercises</h3>
      </form>
      {exerciseComponent}
      <div>
        <button onClick={addExerciseComponent}>Add exercise</button>
        <button onClick={handleSubmit}>Add workout</button>
      </div>
    </div>
  );
};

export default CreateWorkout;
