import React from 'react';

const Workout = ({workout, exercises, prevWorkout}) => {

    const getVolume = (exercise) => workout?.exerciseData[`${exercise} weight`] * workout?.exerciseData[`${exercise} reps`];

    const getPrevVolume = (exercise) => prevWorkout?.exerciseData[`${exercise} weight`] * prevWorkout?.exerciseData[`${exercise} reps`];

    const getVolumeDifference = exercise => {
      const volume = getVolume(exercise);
      const prevVolume = getPrevVolume(exercise);

      if (prevVolume === undefined || volume > prevVolume) {
        return 'lime';
      } else if (volume < prevVolume) {
        return "#FF3333";
      } else {
        return 'yellow';
      }
    };

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
                  <td className="border" style={{ backgroundColor: getVolumeDifference(exercise)}}>
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
