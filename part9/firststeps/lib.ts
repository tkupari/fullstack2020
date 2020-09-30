export const calculateBmi = (cm: number, kg: number): string => {
  const m = cm / 100;
  const bmi = kg / (m * m);
  if (bmi < 15)
    return "Very severely underweight";
  if (bmi < 16)
    return "Severely underweight";
  if (bmi < 18.5)
    return "Underweight";
  if (bmi < 25)
    return "Normal (healthy weight)";
  if (bmi < 30)
    return "Overweight";
  if (bmi < 35)
    return "Obese Class I (Moderately obese)";
  if (bmi < 40)
    return "Obese Class II (Severely obese)";
  return "Obese Class III (Very severely obese)";
};

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

export const calculateExercises = (daily: Array<number>, target: number): Result => {
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
