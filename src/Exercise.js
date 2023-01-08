import React from 'react';

const Exercise = () => {

    return (
      <form className="exercise-component">
        <tr>Exercise</tr>
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
        {/* <button type="submit">confirm exercise</button> */}
      </form>
    );
}

export default Exercise