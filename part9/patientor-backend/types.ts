export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
