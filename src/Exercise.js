import React from 'react';

const Exercise = (key, removeExerciseComponent) => {

    return (
      <fieldset className="exercise-component">
        <input
          className="exercise"
          name="exercise"
          type="text"
          placeholder="Exercise"
        />
        <input
          className="weight"
          name="weight"
          type="number"
          placeholder="weight"
        />
        <input className="reps" name="reps" type="number" placeholder="reps" />
        {/* Make delete exercise button */}
        <button type="button" onClick={() => {removeExerciseComponent(key)}}>Remove exercise</button>
      </fieldset>
    );
}

export default Exercise