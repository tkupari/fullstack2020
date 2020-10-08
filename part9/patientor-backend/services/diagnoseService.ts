import diagnoses from '../data/diagnoses.json';

import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};
