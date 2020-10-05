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

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
