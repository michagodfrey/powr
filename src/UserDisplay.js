import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { FaPlusSquare } from "react-icons/fa";
import Routine from "./Routine";
import CreatRoutine from "./CreateRoutine";

const WorkoutRoutines = ({ user }) => {
    const [allRoutines, setAllRoutines] = useState([]);
    const [tab, setTab] = useState(0);

    const updateTab = (index) => {
      setTab(index);
    }

    useEffect(() => {
        const getRoutines = async () => {
            try {
                const docRef = doc(db, "users", `${user.uid}`);
                
                const docSnap = await getDoc(docRef);
                // console.log(docSnap.data());
                if (docSnap.data().routines) {
                }
                setAllRoutines(docSnap.data().routines);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRoutines();
    }, [user]);

    return (
      <div className="w-full min-h-[calc(100vh-192px)]">
        <ul className="flex flex-wrap">
          {Object.entries(allRoutines).map(([routine], index) => {
            return (
              <li
                key={routine.toString()}
                className={
                  tab === index
                    ? "bg-white text-secondary p-4 cursor-pointer font-bold text-lg border-x"
                    : "bg-secondary text-white p-4 cursor-pointer font-bold text-lg border-x"
                }
                onClick={() => updateTab(index)}
              >
                {routine}
              </li>
            );
          })}
          <li
            className="w-16 min-h-[60px] text-4xl grid items-center cursor-pointer bg-primary hover:bg-primaryHover transition-colors text-black"
            onClick={() => updateTab(-1)}
          >
            <FaPlusSquare className="m-auto" />
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
          <li
            className={
              tab === -1 || Object.entries(allRoutines).length === 0
                ? "w-full"
                : "hidden"
            }
          >
            <CreatRoutine user={user} allRoutines={allRoutines} />
          </li>
        </ul>
      </div>
    );
}

export default WorkoutRoutines
