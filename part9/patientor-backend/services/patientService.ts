import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry, NewEntry } from '../types';

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

const addEntryToPatient = (patient: Patient, newEntry: NewEntry) => {
  patient.entries = patient.entries.concat({
    ...newEntry,
    id: uuid()
  })
  return patient;
};

export default {
  getEntries,
  getEntry,
  getNonSensitiveEntries,
  addEntry,
  addEntryToPatient
};
