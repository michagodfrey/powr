import React from 'react';

const Exercise = () => {

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
      </fieldset>
    );
}

export default Exercise