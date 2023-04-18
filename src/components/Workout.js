import React from 'react';

const Workout = ({workout, exercises, prevWorkout, volDisplay}) => {

    const date = new Date(parseInt(workout.id));
    const dateFormat = { day: "numeric", month: "long" };

    const getVolume = (exercise) => workout?.exerciseData[`${exercise} weight`] * workout?.exerciseData[`${exercise} reps`];
    const getPrevVolume = (exercise) => prevWorkout?.exerciseData[`${exercise} weight`] * prevWorkout?.exerciseData[`${exercise} reps`];
    const getVolumeDifference = exercise => {
      const volume = getVolume(exercise);
      const prevVolume = getPrevVolume(exercise);

      if (!prevVolume || volume > prevVolume) {
        return 'lime';
      } else if (volume < prevVolume) {
        return "#FF3333";
      } else {
        return 'yellow';
      }
    };

    return (
      <tbody>
        {volDisplay ? (exercises.map((exercise, index) => {
          return (
            <React.Fragment key={index}>
              {index === 0 && (
                <tr className="border bg-secondary text-white p-2">
                  <th className="p-2">
                    {date.toLocaleString("en-US", dateFormat)}
                  </th>
                </tr>
              )}
              <tr>
                <td
                  className="border p-2"
                  style={{ backgroundColor: getVolumeDifference(exercise) }}
                >
                  {workout?.exerciseData[`${exercise} weight`] *
                    workout?.exerciseData[`${exercise} reps`]}
                </td>
              </tr>
            </React.Fragment>
          );
        })) : (exercises.map((exercise, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 && (
                  <tr>
                    <th className="border bg-secondary text-white p-2">
                      {date.toLocaleString("en-US", dateFormat)}
                    </th>
                    <th className="border bg-secondary text-white p-2">
                      Weight
                    </th>
                    <th className="border bg-secondary text-white p-2">Reps</th>
                    <th className="border bg-secondary text-white p-2">
                      Volume
                    </th>
                  </tr>
                )}
                <tr>
                  <td className="border p-2">{exercise}</td>
                  <td className="border p-2">
                    {workout?.exerciseData[`${exercise} weight`]}
                  </td>
                  <td className="border p-2">
                    {workout?.exerciseData[`${exercise} reps`]}
                  </td>
                  <td
                    className="border p-2"
                    style={{ backgroundColor: getVolumeDifference(exercise) }}
                  >
                    {workout?.exerciseData[`${exercise} weight`] *
                      workout?.exerciseData[`${exercise} reps`]}
                  </td>
                </tr>
              </React.Fragment>
            ); 
          }))}
      </tbody>
    );
}

export default Workout
