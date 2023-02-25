import React from 'react';

const Routine = ({routine, user}) => {
    return (
      <div className="border" key={routine.id}>
        <div>Name: {routine?.routine}</div>
        <div>Notes: {routine?.notes}</div>
        <ul>
          {routine?.exercises.map((exercise) => {
            return <li key={exercise.toString()}>{exercise}</li>;
          })}
        </ul>
        
      </div>
    );
}

export default Routine
