import React, { useState } from "react";
import { db } from "../firebase-config";
import {
  doc,
  updateDoc,
  deleteField,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import NewWorkout from "./NewWorkout";
import RoutineRecords from "./RoutineRecords";

const Routine = ({ routine, exercises, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);

  const deleteRoutine = async (routine) => {
    if (
      window.confirm(
        "Are you sure you want to delete this routine? Once deleted all exercises and associated workout data will not be displayed. This cannot be undone."
      )
    ) {
      const ref = doc(db, "users", `${user.uid}`);
      try {
        await updateDoc(ref, {
          [`routines.${routine}`]: deleteField(),
        });
      } catch (error) {
        console.log(error.message);
      }
      window.location.reload();
    } else {
      return;
    }
  };

  const deleteExercise = async (exercise) => {
    if (
      window.confirm(
        "Are you sure you want to delete this exercise? Once deleted it will not appear in your routine and past workout data associated with this exercise will not be displayed. This cannot be undone."
      )
    ) {
      const ref = doc(db, "users", `${user.uid}`);
      try {
        await updateDoc(ref, {
          [`routines.${routine}`]: arrayRemove(exercise),
        });
      } catch (error) {
        console.log(error.message);
      }
      window.location.reload();
    } else {
      return;
    }
  };

  const addExercise = async (newExercise) => {
    if (newExercise === "") {
      alert("New exercise needs a name!");
      return;
    }
    const ref = doc(db, "users", `${user.uid}`);

    try {
      await updateDoc(ref, {
        [`routines.${routine}`]: arrayUnion(newExercise),
      });
    } catch (error) {
      console.log(error.message);
    }
    window.location.reload();
  };

  const handleToggleNewWorkoutForm = () => {
    setShowNewWorkoutForm((prevState) => !prevState);
  };

  const handleToggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="p-4 border-t">
      {isEditing ? (
        <>
          <div className="bg-white m-2 items-center">
            <div className="flex justify-end w-full mb-4 ">
              <button
                onClick={handleToggleEditing}
                className="flex items-center border p-2 cursor-pointer bg-secondary hover:bg-secondaryHover transition-colors font-bold text-white shadow-md"
              >
                <img
                  className="h-[25px] lg:h-[35px] mr-2"
                  src={"images/cancel-svgrepo-com.svg"}
                  alt="cancel icon"
                />
                Exit editing
              </button>
            </div>
            <div className="mb-8 text-xl pt-4 pb-2">
              Add new exercise: <div></div>
              <input
                className="p-2 mr-2 mb-2 max-w-full bg-primaryHover text-black border"
                type="text"
                placeholder="new exercise"
                onChange={(event) => {
                  setNewExercise(event.target.value);
                }}
                required
              />
              <button
                className="bg-primary hover:bg-primaryHover transition-colors border text-black font-bold p-2 w-[269px] max-w-full"
                onClick={() => {
                  addExercise(newExercise);
                }}
              >
                Add exercise
              </button>
            </div>
            <p className="text-2xl mb-4">
              <b className="text-warning">CAUTION</b> - delete routines and
              exercises
            </p>
            <hr></hr>
            <button
              className="bg-warning my-4 p-4 text-white flex items-center shadow-md"
              onClick={() => deleteRoutine(routine)}
            >
              <h2 className="text-2xl mr-2">
                Delete <b>{routine}</b>
              </h2>
              <img
                src="images/trash-2-svgrepo-com.svg"
                alt="delete exercise input icon"
              />
            </button>
          </div>
          <ul className="flex flex-wrap items-center p-4 text-xl">
            <li>
              <b>Delete exercises:</b>{" "}
            </li>
            {exercises.map((exercise, index) => (
              <li key={index}>
                <button
                  className="bg-warning ml-4 flex items-center border text-white p-2 shadow"
                  onClick={() => deleteExercise(exercise)}
                >
                  {exercise}
                  <img
                    className="ml-2"
                    src="images/trash-2-svgrepo-com.svg"
                    alt="delete exercise input icon"
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="p-4 shadow-md mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">{routine}</h2>
              <button onClick={handleToggleEditing}>
                <img
                  className="h-[25px] lg:h-[35px] transition-opacity hover:opacity-50"
                  src={"images/edit-2-svgrepo-com.svg"}
                  alt="gear icon"
                />
              </button>
            </div>
            <ul className="flex flex-wrap text-xl">
              <li className="font-bold">Exercises:</li>
              {exercises.map((exercise, index) => (
                <li key={index} className="mx-2">
                  {index === exercises.length - 1 && exercises.length > 1
                    ? `and ${exercise}.`
                    : `${exercise},`}
                </li>
              ))}
            </ul>
          </div>
          {showNewWorkoutForm ? (
            <button
              className="bg-secondary hover:bg-secondaryHover text-xl border-2 border-white font-bold text-white p-4 my-2 flex items-center justify-between"
              type="button"
              onClick={handleToggleNewWorkoutForm}
            >
              Hide new workout <FaArrowAltCircleUp className="ml-4" />
            </button>
          ) : (
            <button
              className="bg-primary hover:bg-primaryHover transition-colors border-2 text-xl font-bold text-black p-4 my-2 flex items-center justify-between"
              type="button"
              onClick={handleToggleNewWorkoutForm}
            >
              Record a new workout <FaArrowAltCircleDown className="ml-4" />
            </button>
          )}

          {showNewWorkoutForm && (
            <NewWorkout user={user} routine={routine} exercises={exercises} />
          )}
          <RoutineRecords user={user} routine={routine} exercises={exercises} />
        </>
      )}
    </div>
  );
};

export default Routine;
