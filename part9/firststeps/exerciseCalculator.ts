interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  value: number,
  description: string
}

const calculateRating = (average: number, target: number): Rating => {
  const delta = average - target;
  if (delta < -1)
    return {
      value: 1,
      description: 'try harder next time'
    };
  if (delta < 0)
    return {
      value: 2,
      description: 'not too bad but could be better'
    };
  return {
    value: 3,
    description: 'very good'
  };
};

const calculateExercises = (daily: Array<number>, target: number): Result => {
  const average = daily.reduce((acc, val) => acc + val) / daily.length;

  const rating = calculateRating(average, target);

  return {
    periodLength: daily.length,
    trainingDays: daily.filter(h => h > 0).length,
    success: average >= target,
    rating: rating.value,
    ratingDescription: rating.description,
    target,
    average
  };
};

const target = Number(process.argv[2]);
const hours = process.argv.slice(3).map(v => Number(v));
console.log(calculateExercises(hours, target));
