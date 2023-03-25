import React, {useState, useEffect} from 'react';
import {db} from "./firebase-config";
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
                const snapshot = await getDocs(
                    collection(db, "users", `${user.uid}`, routine)
                );
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
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl">Workout records for {routine}</h3>
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
      </div>
    );
}

export default RoutineRecords
