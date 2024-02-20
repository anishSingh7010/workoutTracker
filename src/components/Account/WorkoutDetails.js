export const WorkoutDetails = (props) => {
  const workout = props.workout;
  const workoutDate = new Date(workout.date).toDateString();
  return (
    <div style={{ margin: 'auto' }}>
      <h1>{workoutDate}</h1>
      <p>Total volume: {workout.volume}</p>
      {workout.exercises.map((exercise, index1) => {
        const exerciseName =
          props.exerciseMap[exercise['_exercise']]?.name ||
          'Exercise Not Found';
        return (
          <div>
            <h2>{exerciseName}</h2>
            {exercise.weights.map((weight, index2) => {
              return (
                <div key={'a' + index1 + 'b' + index2}>
                  <p>Set {index2 + 1}</p>
                  <p>
                    {weight} for {exercise.reps[index2]} reps
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default WorkoutDetails;
