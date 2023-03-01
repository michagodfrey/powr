import React from "react";
import {useState, useEffect} from "react";
import {db} from "./firebase-config";
import {collection, getDocs} from "firebase/firestore";
import WorkoutRecord from "./WorkoutRecord";

// A component made on the first iteration, as of the last commit, it successfully
// displayed created workouts for the user
// WorkoutRecord commented out because I was trying new things, but if the user
// only has data created by CreateWorkout, then it works
const DisplayWorkouts = ({user}) => {
  const [allWorkouts, setAllWorkouts] = useState([]);

  // get all workouts
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "users", `${user.uid}`, "workouts")
        );
        let tempArr = [];
        snapshot.forEach((doc) => {
          tempArr.push({...doc.data(), id: doc.id});
        });
        setAllWorkouts([...tempArr]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getWorkouts();
  }, [user]);

  return (
    <>
      <h1>Display Workouts Component</h1>
      <table className="w-full">
        {/* {allWorkouts.map((workout) => {
          return (
            <WorkoutRecord key={workout.id} workout={workout} user={user} />
          );
        })} */}
      </table>
    </>
  );
};

export default DisplayWorkouts;
