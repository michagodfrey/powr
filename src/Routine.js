import React, {useState} from "react";
import {db} from "./firebase-config";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
// import AddWorkout from "./AddWorkout";
// import Workout from"./Workout";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import uuid from "react-uuid";

const Routine = ({setWeight, setReps, routine, exercises, user}) => {
  // disable tabs while editing
    const [isEditing, setIsEditing] = useState(false);
    // const [date, setDate] = useState(new Date());

    // delete entire routine, the path is set up for the old data structure 
    const deleteRoutine = async () => {
        // alert('disabled for production')
        try {
        await deleteDoc(
            doc(db, "users", `${user.uid}`, "workouts", `${routine.id}`)
        );
        console.log("deleted routine");
        } catch (error) {
        console.log(error.message);
        }
        window.location.reload();
    };

    // this deletes entire array of exercises, want it to delete single elements in the array
    // const deleteExercise = async (exercise) => {
    //     const ref = doc(db, "users", `${user.uid}`, "workouts", `${routine.id}`)
    //     try {
    //         await updateDoc(ref, {
    //             exercises: arrayRemove(exercise)
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (
      <div className="border p-4">
        {isEditing ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Routine: {routine}</h2>
              <button className="bg-warning m-4" onClick={deleteRoutine}>
                Delete Routine
              </button>
            </div>
            <button onClick={() => setIsEditing(!isEditing)}>
              <img
                className="h-[25px] lg:h-[35px] transition ease-in-out hover:scale-110"
                src={"images/settings-gear-part-2-svgrepo-com.svg"}
              />
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Routine: {routine}</h2>
              <button onClick={() => setIsEditing(!isEditing)}>
                <img
                  className="h-[25px] lg:h-[35px] transition ease-in-out hover:scale-110"
                  src={"images/settings-gear-part-2-svgrepo-com.svg"}
                />
              </button>
            </div>
            <ul className="flex flex-wrap border">
              <li>
                <h3 className="m-2 text-lg font-bold p-2">Exercises:</h3>
              </li>
              {exercises.map((exercise) => {
                return (
                  <li
                    key={exercise.toString()}
                    className="m-2 text-lg font-bold p-2"
                  >
                    {exercise}
                    {/* <button className="bg-warning m-4">Delete Exercise</button> */}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <div className="h-[500px] border bg-gray">
          <p className="p-5 underline">Data display area</p>
          {/* <form>
            <DatePicker
              selected={date}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              closeOnScroll={true}
              onChange={(date) => setDate(date)}
            />
            {exercises.map((exercise) => {
              return (
                <fieldset key={uuid()}>
                  {exercise}:<label>Weight</label>
                  <input
                    type="number"
                    placeholder="weight"
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                  <label>Reps</label>
                  <input
                    type="number"
                    placeholder="reps"
                    onChange={(e) => {
                      setReps(e.target.value);
                    }}
                  />
                </fieldset>
              );
            })}
            <button
              className="bg-black text-white m-4"
            >
              Add workout data
            </button>
          </form> */}
        </div>
        {/* <AddWorkout routine={routine} exercises={exercises} user={user} /> */}
      </div>
    );
}

export default Routine
