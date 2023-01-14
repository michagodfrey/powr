import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import WorkoutRecord from './WorkoutRecord';

const DisplayWorkouts = ({ user }) => {
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
          tempArr.push({ ...doc.data(), id: doc.id });
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
      <table>
        {allWorkouts.map((workout) => {
          return (
           <WorkoutRecord key={workout.id} workout={workout} user={user} />
          );
        })}
      </table>
    </>
  );
}

export default DisplayWorkouts;
