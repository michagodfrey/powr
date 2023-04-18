import React, {useState, useEffect} from 'react';
import {db} from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";
import Workout from "./Workout";

const RoutineRecords = ({user, routine, exercises}) => {
    const [workouts, setWorkouts] = useState([]);
    const [volDisplay, setVolDisplay] = useState(false);

    const toggleDisplayVolumes = () => {
      setVolDisplay(!volDisplay);
    };

    useEffect(() => {
        const getWorkouts = async () => {
            try {
                const routineRef = collection(db, "users", `${user.uid}`, routine);

                const snapshot = await getDocs(routineRef);
                let tempArr = [];
                snapshot.forEach(doc => {
                    tempArr.push({...doc.data(), id: doc.id});
                });
                setWorkouts([...tempArr]);
            } catch (error) {
                console.log(error.message);
            }
        };
        getWorkouts();
    }, [user, routine]);
    
    const ExerciseColumn = ({ exercises, volDisplay }) => {
        return volDisplay ? (
          <>
            <div className="border bg-secondary text-white font-bold text-xl p-2">Exercise</div>
            {exercises.map((exercise, index) => {
              return (
                <div key={index} className="border text-xl p-2">
                  {exercise}
                </div>
              );
            })}
          </>
        ) : null;
    };

    return (
      <div className="bg-white p-4">
        {workouts.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-2xl">
                Workout records for <b>{routine}</b>
              </h3>
              <div className="flex items-center">
                <span className="mr-4 text-lg">Volume Only Display</span>
                <div
                  onClick={toggleDisplayVolumes}
                  className={`flex w-20 h-10 rounded-full cursor-pointer ${
                    volDisplay ? "bg-secondary" : "bg-primary"
                  }`}
                >
                  <span
                    className={`h-10 w-10 rounded-full ${
                      volDisplay ? "bg-white" : "bg-black ml-10"
                    }`}
                  ></span>
                </div>
              </div>
            </div>
            <p className="mb-2">
              Workout data by date. A{" "}
              <span className="border bg-[lime]">green cell</span> means you
              achieved progressive overload! That is, increased volume (weight x reps)
              compared to the previous workout.
            </p>
            <div className="flex justify-start">
              <div>
                <ExerciseColumn exercises={exercises} volDisplay={volDisplay} />
              </div>
              <table className="flex flex-wrap text-xl border">
                {workouts.map((workout, index) => {
                  return (
                    <Workout
                      key={workout.id}
                      workout={workout}
                      exercises={exercises}
                      prevWorkout={index > 0 ? workouts[index - 1] : null}
                      volDisplay={volDisplay}
                    />
                  );
                })}
              </table>
            </div>
          </>
        ) : (
          <p>
            No workout records for <b>{routine}</b> yet!
          </p>
        )}
      </div>
    );
}

export default RoutineRecords
