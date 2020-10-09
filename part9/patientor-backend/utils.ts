/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  NewPatientEntry,
  Gender,
  NewBaseEntry,
  NewEntry,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: any, field: string): string => {
  if(!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${field}: ` + str);
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


const isGender = (param: any) : param is Gender => {
  return Object.values(Gender).includes(param);
}

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: []
  };
};

const toNewEntry = (object: any): NewEntry => {
  const baseEntry: NewBaseEntry = {
    date: parseDate(object.date),
    description: parseString(object.description, 'description'),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: object.diagnosisCodes
  };
  switch(object.type) {
    case "OccupationalHealthCare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, 'employerName')
      }
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria, 'discharge criteria')
        }
      }
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseInt(object.healthCheckRating)
      }
    default:
      throw new Error("invalid type");
  }
}

export default {
  toNewPatientEntry,
  toNewEntry
}
