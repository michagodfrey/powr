import React, {useState} from 'react';
import {doc, setDoc, updateDoc, addDoc, collection} from "firebase/firestore";
import {db} from "./firebase-config";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import uuid from "react-uuid";

const AddWorkout = ({routine, user}) => {
    const [workoutNotes, setWorkoutNotes] = useState("");
    // const [weight, setWeight] = useState(0);
    // const [reps, setReps] = useState(0);
    // const [date, setDate] = useState(new Date());

    const exercises = routine.exercises;

    // this function is supposed to add data to the document but I can't get it to work
    const addWorkoutData = async () => {
    //     const weight = document.querySelectorAll(".weight");
    //     const reps = document.querySelectorAll(".reps");

    //     let tempList = [];
        
    //     for (let i = 0; i < exercises.length; i++) {
    //         if (weight[i].value.length < 1 || reps[i].value.length < 1) {
    //             alert("Inputs cannot be blank");
    //             return;
    //         } else {
    //             tempList.push({
    //                 exercise: exercises[i],
    //                 weight: weight[i].value,
    //                 reps: reps[i].value,
    //                 })
    //         }
    //     }
        
    //     const docRef = doc(
    //       db,
    //       `users/${user.uid}/workouts`,
    //       routine.id
    //     );
    //     await updateDoc(docRef, {
    //         newValue: "string",
    //         notes: workoutNotes,
    //         // data: [...tempList],
    //         }, {merge: true}
    //     );

    //     window.location.reload();
    }

    return (
      <div className="border">
        <p>Add Workout Component</p>
        <form>
          {/* <DatePicker
            selected={date}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            closeOnScroll={true}
            onChange={(date) => setDate(date)}
          /> */}
          <textarea
            name="notes"
            placeholder="Workout notes"
            maxLength={200}
            onChange={(event) => {
              setWorkoutNotes(event.target.value);
            }}
          ></textarea>
          {exercises.map((exercise) => {
            return (
              <fieldset key={uuid()}>
                {exercise}:<label>Weight</label>
                <input
                  className="weight"
                  name="weight"
                  type="number"
                  placehoder="Weight"
                //   min={1}
                //   max={1000}
                // onChange={event => setWeight(event.target.value)}
                />
                <label>Reps</label>
                <input
                  className="reps"
                  name="reps"
                  type="number"
                  placehoder="Reps"
                  // onChange={event => setReps(event.target.value)}
                //   min={1}
                //   max={1000}
                />
              </fieldset>
            );
          })}
          <button className="bg-black text-white m-4" onClick={addWorkoutData}>
            Add workout data
          </button>
        </form>
      </div>
    );
}

export default AddWorkout
