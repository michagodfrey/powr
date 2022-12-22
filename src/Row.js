import React from 'react'

const Row = () => {

    // useEffect(() => {
    //   setLoading(true);
    //   setError(false);
    //   axios
    //     .get(
    //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
    //     )
    //     .then((res) => {
    //       setLoading(false);
    //       // console.log(res.data);
    //       setCoins(res.data);
    //     })
    //     .catch((error) => {
    //       setError(true);
    //       setLoading(false);
    //       console.log(error);
    //     });
    // }, []);


  return (
    <>
      <tr>
        <td>Squats</td>
        <td>10</td>
        <td>100 lbs</td>
        <td>1000 lbs</td>
      </tr>
      <tr>
        <td>Push-ups</td>
        <td>15</td>
        <td>Body weight</td>
        <td>225 lbs</td>
      </tr>
      <tr>
        <td>Deadlifts</td>
        <td>8</td>
        <td>200 lbs</td>
        <td>1600 lbs</td>
      </tr>
      {/* <button
                  onClick={() => {
                    updateReps(exercise.id, exercise.reps);
                  }}
                >
                  Increase reps
                </button> */}
      {/* <button
                  onClick={() => {
                    deleteExercise(exercise.id);
                  }}
                >
                  Delete exercise
                </button> */}
    </>
  );
}

export default Row