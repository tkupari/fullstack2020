import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getEntry = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    ...entry,
    id: uuid()
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getEntry,
  getNonSensitiveEntries,
  addEntry
};
