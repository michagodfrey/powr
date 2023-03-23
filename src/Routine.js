import React, {useState} from "react";
// import {db} from "./firebase-config";
// import {doc, updateDoc, deleteField} from "firebase/firestore";
import NewWorkout from "./NewWorkout";
import RoutineRecords from "./RoutineRecords";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import uuid from "react-uuid";

const Routine = ({routine, exercises, user}) => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [newRoutineName, setNewRoutineName] = useState("");
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);
  // const [date, setDate] = useState(new Date());

  // CREATE DELETE ROUTINE FUNCTION
  // const deleteRoutine = async (routine) => {
  // alert('disabled for production')
  // old delete whole doc code
  // try {
  //   await deleteDoc(doc(db, "users", `${user.uid}`));
  //   console.log("deleted routine");
  // } catch (error) {
  //   console.log(error.message);
  // }

  // this function can't tartget the nested values of routines map in user doc
  //   const ref = doc(db, "users", `${user.uid}`);
  //   try {
  //     await updateDoc(ref, {
  //       routines: {
  //         [routine]: deleteField(),
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   window.location.reload();
  // };

  // CREATE UPDATE ROUTINE NAME FUNCTION
  // this wipes all routines and replaces it with the new name
  // const updateRoutine = async (routine) => {
  //   const docRef = doc(db, "users", `${user.uid}`);
  //   try {
  //     await updateDoc(docRef, {
  //       routines: {
  //         [routine]: newRoutineName,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   window.location.reload();
  // };

  // FUNCTION TO EDIT NAMES OF EXERCISES
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

  const handleToggleNewWorkoutForm = () => {
    setShowNewWorkoutForm((prevState) => !prevState);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{routine}</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ul>
      <button
        className="bg-primary hover:bg-primaryHover font-bold text-black p-4 my-2 ml-2 w-[280px]"
        type="button"
        onClick={handleToggleNewWorkoutForm}
      >
        Add New Workout
      </button>
      {showNewWorkoutForm && (
        <NewWorkout user={user} routine={routine} exercises={exercises} />
      )}
      <RoutineRecords user={user} routine={routine} exercises={exercises} />
    </div>
  );


  // <DatePicker
  //   selected={date}
  //   dateFormat="dd/MM/yyyy"
  //   maxDate={new Date()}
  //   closeOnScroll={true}
  //   onChange={(date) => setDate(date)}
  // />;

  // return (
  //   <div className="border p-4">
  //     {isEditing ? (
  //       <div className="flex justify-between items-center">
  //         <div className="flex items-center">
  //           <span>Caution: delete routine and edit name</span>
  //           <input
  //             type="text"
  //             placeholder={routine}
  //             className="text-2xl font-bold"
  //             onChange={(event) => {
  //               setNewRoutineName(event.target.value);
  //             }}
  //           />
  //           <button
  //             className="bg-yellow m-4"
  //             onClick={() => updateRoutine(routine)}
  //           >
  //             Change Name
  //           </button>
  //           <button
  //             className="bg-warning m-4"
  //             onClick={() => deleteRoutine(routine)}
  //           >
  //             Delete Routine
  //           </button>
  //         </div>
  //         <button onClick={() => setIsEditing(!isEditing)}>
  //           <img
  //             className="h-[25px] lg:h-[35px] transition ease-in-out hover:scale-110"
  //             src={"images/settings-gear-part-2-svgrepo-com.svg"}
  //           />
  //         </button>
  //       </div>
  //     ) : (
  //       <>
  //         <div className="flex justify-between items-center">
  //           <h2 className="text-2xl font-bold">Routine: {routine}</h2>
  //           <button onClick={() => setIsEditing(!isEditing)}>
  //             <img
  //               className="h-[25px] lg:h-[35px] transition ease-in-out hover:scale-110"
  //               src={"images/settings-gear-part-2-svgrepo-com.svg"}
  //             />
  //           </button>
  //         </div>
  //         <ul className="flex flex-wrap border">
  //           <li>
  //             <h3 className="m-2 text-lg font-bold p-2">Exercises:</h3>
  //           </li>
  //           {exercises.map((exercise) => {
  //             return (
  //               <li
  //                 key={exercise.toString()}
  //                 className="m-2 text-lg font-bold p-2"
  //               >
  //                 {exercise}
  //                 {/* <button className="bg-warning m-4">Delete Exercise</button> */}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </>
  //     )}
  //     <NewWorkout user={user} routine={routine} />
  //     <div className="h-[500px] border bg-gray">
  //       <p className="p-5 underline">Data display area</p>
  // remove bracket if using commented out code above
}

export default Routine