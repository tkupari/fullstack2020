import { calculateExercises } from './lib';

const target = Number(process.argv[2]);
const hours = process.argv.slice(3).map(v => Number(v));
console.log(calculateExercises(hours, target));
