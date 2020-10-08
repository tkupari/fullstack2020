export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

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

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;