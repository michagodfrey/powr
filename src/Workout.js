import React from 'react';
// import {db} from "./firebase-config";
// import {doc, deleteDoc} from "firebase/firestore";

const Workout = ({workout, exercises, user}) => {

    return (
      <tbody>
          {exercises.map((exercise, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 && (
                  <tr>
                    <th className="border bg-secondary text-white">
                      date: {workout.id}
                    </th>
                    <th className="border bg-secondary text-white">Weight</th>
                    <th className="border bg-secondary text-white">Reps</th>
                    <th className="border bg-secondary text-white">Volume</th>
                  </tr>
                )}
                <tr>
                  <td className="border">{exercise}</td>
                  <td className="border">
                    {workout?.exerciseData[`${exercise} weight`]}
                  </td>
                  <td className="border">
                    {workout?.exerciseData[`${exercise} reps`]}
                  </td>
                  <td className="border">
                    {workout?.exerciseData[`${exercise} weight`] *
                      workout?.exerciseData[`${exercise} reps`]}
                  </td>
                </tr>
              </React.Fragment>
            ); 
          })}
      </tbody>
    );
}

export default Workout
