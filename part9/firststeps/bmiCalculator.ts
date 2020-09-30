const calculateBmi = (cm: number, kg: number): string => {
  const m = cm / 100
  const bmi = kg / (m * m)
  if (bmi < 15)
    return "Very severely underweight"
  if (bmi < 16)
    return "Severely underweight"
  if (bmi < 18.5)
    return "Underweight"
  if (bmi < 25)
    return "Normal (healthy weight)";
  if (bmi < 30)
    return "Overweight"
  if (bmi < 35)
    return "Obese Class I (Moderately obese)"
  if (bmi < 40)
    return "Obese Class II (Severely obese)"
  return "Obese Class III (Very severely obese)"
}

console.log(calculateBmi(180, 74))
