import { calculateBmi } from './lib'

const cm = Number(process.argv[2])
const kg = Number(process.argv[3])
console.log(calculateBmi(cm, kg))
