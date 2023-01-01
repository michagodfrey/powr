import React, {useState} from 'react'

const Exercise = ({exerciseList, setExerciseList}) => {
    const [exercise, setExercise] = useState("");
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault()
        setExerciseList([...exerciseList, {
            exercise: exercise,
            weight: weight,
            reps: reps
        }]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            name="exercise"
            type="text"
            placeholder="Exercise"
            onChange={(e) => {
                setExercise(e.target.value);
            }}
            />
            <input
            name="reps"
            type="number"
            placeholder="weight"
            onChange={(e) => {
                setWeight(e.target.value);
            }}
            />
            <input
            name="weight"
            type="number"
            placeholder="reps"
            onChange={(e) => {
                setReps(e.target.value);
            }}
            />
            <button type="submit">confirm exercise</button>
        </form>
    );
}

export default Exercise