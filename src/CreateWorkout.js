import React, { useState } from 'react';
import { doc, setDoc, getDocs, query, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import Exercise from './Exercise';

const CreateWorkout = () => {
  const [ exerciseComponent, setExerciseComponent ] = useState([]);
  const [ workout, setWorkout ] = useState({});
  
  // form input fields
  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
    console.log(workout)
  };

    // add new exercise input field
    const addExerciseComponent = () => {
      setExerciseComponent(
        exerciseComponent.concat(
          <Exercise
            key={exerciseComponent.length}
          />
        )
      );
    };

  const handleSubmit = async () => {

    // push execise data to array
    const exercise = document.querySelectorAll(".exercise");
    const weight = document.querySelectorAll(".weight");
    const reps = document.querySelectorAll(".reps");

    let tempList = [];

    for (let i = 0; i < exercise.length; i++) {
      console.log(exercise[i].value)
      tempList.push({
        exercise: exercise[i].value,
        weight: weight[i].value,
        reps: reps[i].value,
      });
    }

    // get user
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    // console.log(queryData);

    // create new document on Firestore database
    queryData.map(async () => {
      await setDoc(
        // change to user id and sequentially generated doc title, workout-1
        doc(db, "users/hwUQMGclPZQCJUO1jgYPDnzQwZp2/workouts", "workoutTest-0"),
        {
          date: workout.date,
          notes: workout.notes,
          exercises: [...tempList]
        }
      );
    });
  };

  return (
    <div>
      <h1>Create Workout component</h1>
      <h2>Add new workout</h2>
      <form>
        <input
          name="date"
          type="string"
          placeholder="date"
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Workout notes"
          onChange={handleChange}
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
}

export default CreateWorkout