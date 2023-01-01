import React, { useState } from 'react';
import { doc, setDoc, getDocs, query, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import Exercise from './Exercise';

const CreateWorkout = () => {
  const [ exerciseComponent, setExerciseComponent ] = useState([]);
  const [ exerciseList, setExerciseList ] = useState([
    // {
    //   exercise: "deadlift",
    //   weight: 100,
    //   reps: 30
    // }, {
    //   exercise: "squats",
    //   weight: 100,
    //   reps:24
    // }
  ]);
  const [ workout, setWorkout ] = useState({});
  

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
    console.log(workout)
  };


  console.log(exerciseList)
 
    // const handleAddExercise = (exercise, weight, reps) => {
    //   const exercise = {
    //     exercise: 
    //   }
    // };

    // add new exercise input field
    const addExerciseComponent = () => {
      setExerciseComponent(
        exerciseComponent.concat(
          <Exercise
            key={exerciseComponent.length}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        )
      );
    };

  const handleSubmit = async () => {
    
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    console.log(queryData);
    queryData.map(async () => {
      await setDoc(
        doc(db, "users/hwUQMGclPZQCJUO1jgYPDnzQwZp2/workouts", "workoutTest"),
        {
          date: workout.date,
          notes: workout.notes,
          exercises: [...exerciseList]
        }
      );
    });
  };

  const showExList = () => {
    console.log(exerciseList)
  }

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
        {/* <h3>Exercises</h3> */}
        {/* <div className="exerciseComponent">
          <input
            name="exercise"
            type="text"
            placeholder="Exercise"
            onChange={exerciseChange}
          />
          <input
            name="reps"
            type="number"
            placeholder="weight"
            onChange={exerciseChange}
          />
          <input
            name="weight"
            type="number"
            placeholder="reps"
            onChange={exerciseChange}
          />
        </div> */}
        
        {/* <input type="submit" value="Add workout" /> */}
      </form>
      {exerciseComponent}
      <div>
        <button onClick={addExerciseComponent}>Add exercise</button>
        <button onClick={handleSubmit}>Add workout</button>
        <button onClick={showExList}>Check exercise list</button>
      </div>
    </div>
  );
}

export default CreateWorkout