import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import Routine from "./Routine";
import CreatRoutine from "./CreateRoutine";

// This component displays the routines created by the user
const WorkoutRoutines = ({ user }) => {
    const [allRoutines, setAllRoutines] = useState([]);
    const [tab, setTab] = useState(0);

    // consider how to display create new routine when the user is new
    const updateTab = (index) => {
      setTab(index);
    }

    useEffect(() => {
        const getRoutines = async () => {
            const docRef = doc(db, "users", `${user.uid}`);
            try {
                const docSnap = await getDoc(docRef);
                // console.log(docSnap.data());
                setAllRoutines(docSnap.data().routines);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRoutines();
    }, [user]);

    // add loading function

    // add something to default to view of create workout component if no routines exist
    
    return (
      <div className="w-full min-h-[calc(100vh-192px)]">
        <ul className="flex flex-wrap">
          {Object.entries(allRoutines).map(([routine], index) => {
            return (
              <li
                key={routine.toString()}
                className="border p-4 cursor-pointer"
                onClick={() => updateTab(index)}
              >
                {routine}
              </li>
            );
          })}
          <li
            className="border py-3 min-w-[60px] text-center text-2xl cursor-pointer bg-secondary text-white font-bold"
            onClick={() => updateTab(-1)}
          >
            +
          </li>
        </ul>
        <ul className="flex flex-wrap">
          {Object.entries(allRoutines).map(([routine, exercises], index) => {
            return (
              <li
                key={routine.toString()}
                className={tab !== index ? "hidden" : "w-full"}
              >
                <Routine routine={routine} exercises={exercises} user={user} />
              </li>
            );
          })}
          <li className={tab === -1 ? "w-full" : "hidden"}>
            <CreatRoutine user={user} />
          </li>
        </ul>
      </div>
    );
}

export default WorkoutRoutines
