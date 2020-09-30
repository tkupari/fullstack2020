import express from 'express';
import { calculateBmi } from './lib'

const app = express();
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const cm = Number(req.query.height)
  const kg = Number(req.query.weight)
  if(isNaN(cm) || isNaN(kg)) {
    return res.json({
      error: 'malformatted parameters'
    })
  }

  return res.json({
    weight: kg,
    height: cm,
    bmi: calculateBmi(cm, kg)
  })
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



