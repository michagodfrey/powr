import React from 'react';


const CreateWorkout = () => {
  return (
    <div>
      <form>
        <input placeholder="Workout name" />
        <input placeholder="Workout notes" />
        <textarea placeholder='Workout notes'></textarea>
        <input placeholder="add exercise" />
        <input type="number" placeholder="starting reps" />
        <input type="number" placeholder="starting weight" />
        <button>Add exercise</button>
        <button>Save workout</button>
      </form>
    </div>
  );
}

export default CreateWorkout