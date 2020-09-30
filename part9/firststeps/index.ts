import express from 'express';
import { calculateBmi, calculateExercises } from './lib';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const cm = Number(req.query.height);
  const kg = Number(req.query.weight);
  if(isNaN(cm) || isNaN(kg)) {
    return res.json({
      error: 'malformatted parameters'
    });
  }

  return res.json({
    weight: kg,
    height: cm,
    bmi: calculateBmi(cm, kg)
  });
});

interface ExerciseRequest {
  daily_exercises: Array<number>,
  target: number
}

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ExerciseRequest = req.body;
  if (!data.daily_exercises || !data.target) {
    return res.json({
      error: 'parameters missing'
    });
  }
  if(!Array.isArray(data.daily_exercises) || !data.daily_exercises.every(v => !isNaN(Number(v)))) {
    return res.json({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(data.daily_exercises, data.target);
  return res.json(result);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



