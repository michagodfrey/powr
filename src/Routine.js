import React, {useState} from "react";
import {db} from "./firebase-config";
import {doc, getDoc, updateDoc, deleteField, arrayRemove, arrayUnion} from "firebase/firestore";
import NewWorkout from "./NewWorkout";
import RoutineRecords from "./RoutineRecords";

const Routine = ({routine, exercises, user}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState("");
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);

  // this will only delete the routine array from the user doc, 
  // any saved workouts will remain but won't be displayed
  const deleteRoutine = async (routine) => {
      const ref = doc(db, "users", `${user.uid}`);
      try {
        await updateDoc(ref, {
          [`routines.${routine}`]: deleteField(),
        });
      } catch (error) {
        console.log(error.message);
      }
      window.location.reload();
  };

  const updateRoutine = async (routineName) => {
    const ref = doc(db, "users", `${user.uid}`);
    try {
      const docSnap = await getDoc(ref);
      const routines = docSnap.data().routines;
      const routineToUpdate = routines[routineName];
      console.log(routines)

      // if (routineToUpdate) {
      //   const updatedRoutine = {...routineToUpdate, name: newRoutineName};

      // const updatedRoutine = { ...routineToUpdate}

        // await updateDoc(ref, {
        //   routineToUpdate: newRoutineName,
        // });

      //   await updateDoc(ref, {
      //     routines: arrayRemove(routineToUpdate),
      //   });
        
      // }
    } catch (error) {
      console.log(error.message);
    }
    // window.location.reload();
  };

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
    <div className="p-4 border-t">
      {isEditing ? (
        <>
          <div className="flex justify-between m-2 items-center">
            <span>Caution: delete routine and edit name</span>
            <input
            type="text"
            placeholder={routine}
            className="text-2xl font-bold"
            onChange={(event) => {
              setNewRoutineName(event.target.value);
            }}
            />
            <button
              className="bg-yellow m-4"
              onClick={() => updateRoutine(routine)}
            >
              Change Name
            </button>
            <button
              className="bg-warning m-4"
              onClick={() => deleteRoutine(routine)}
            >
              Delete Routine
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center"
            >
              <img
                className="h-[25px] lg:h-[35px] mr-2 transition ease-in-out hover:scale-110"
                src={"images/cancel-svgrepo-com.svg"}
                alt="cancel icon"
              />
              End editing
            </button>
          </div>
          <ul className="flex flex-wrap bg-primary p-4 text-xl">
            <li className="font-bold">Exercises:</li>
            {exercises.map((exercise, index) => (
              <li key={index} className="mx-2">
                {index === exercises.length - 1 && exercises.length > 1
                  ? `and ${exercise}.`
                  : `${exercise},`}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex justify-between m-2 items-center">
            <h2 className="text-3xl font-bold">{routine}</h2>
            <button onClick={() => setIsEditing(!isEditing)}>
              <img
                className="h-[25px] lg:h-[35px] transition ease-in-out hover:scale-110"
                src={"images/settings-gear-part-2-svgrepo-com.svg"}
                alt="gear icon"
              />
            </button>
          </div>

          <ul className="flex flex-wrap bg-white p-4 text-xl">
            <li className="font-bold">Exercises:</li>
            {exercises.map((exercise, index) => (
              <li key={index} className="mx-2">
                {index === exercises.length - 1 && exercises.length > 1
                  ? `and ${exercise}.`
                  : `${exercise},`}
              </li>
            ))}
          </ul>
          <button
            className="bg-secondary hover:bg-primaryHover font-bold text-white p-4 my-2 w-[280px]"
            type="button"
            onClick={handleToggleNewWorkoutForm}
          >
            Add New Workout
          </button>
          {showNewWorkoutForm && (
            <NewWorkout user={user} routine={routine} exercises={exercises} />
          )}
          <RoutineRecords user={user} routine={routine} exercises={exercises} />
        </>
      )}
    </div>
  );




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