import React from 'react';

// First iteration component, will remove from final version
const Exercise = () => {

    return (
      <fieldset>
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