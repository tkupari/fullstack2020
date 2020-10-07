import React, { ReactHTML } from "react";
import axios from "axios";
import { Container, Icon, Segment } from "semantic-ui-react";

import {
  Patient,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";
import { useParams } from "react-router-dom";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment>
      <h4>{entry.date} <Icon name='doctor' size='big' /></h4>
      <em>{entry.description}</em>
      <ul>
        {entry.diagnosisCodes?.map((d, i) =>
          <li key={i}>{d} {diagnoses[d].name}</li>
        )}
      </ul>
      {[...Array(3 - entry.healthCheckRating)].map(_ =>
        <Icon name='heart' />)}
      {[...Array(entry.healthCheckRating)].map(_ =>
        <Icon name='heart outline' />)}
    </Segment>
  )
}

const OccupationalHealthCareDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment>
      <h4>
        {entry.date}
        <Icon name='stethoscope' size='big' />
        {entry.employerName}
      </h4>
      <em>{entry.description}</em>
      <ul>
        {entry.diagnosisCodes?.map((d, i) =>
          <li key={i}>{d} {diagnoses[d].name}</li>
        )}
      </ul>
    </Segment>
  )
}

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment>
      <h4>
        {entry.date}
        <Icon name='hospital' size='big' />
      </h4>
      <ul>
        {entry.diagnosisCodes?.map((d, i) =>
          <li key={i}>{d} {diagnoses[d].name}</li>
        )}
      </ul>
      {entry.discharge.date} {entry.discharge.criteria}
    </Segment>
  )
}

const EntryDetails: React.FC<{entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthCareDetails entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />
    default:
      return assertNever(entry);
  }

}

const PatientListPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientDetails = async (patientId: string) => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setPatientDetails(patientDetails));
      } catch (e) {
        console.error(e);
      }
    };

    if(!patientId)
      return;
    
    const patient = patients[patientId];
    if(!patient)
      return;

    if(!patient.ssn) {
    fetchPatientDetails(patientId);

    }
  }, [patients, patientId, dispatch]);

  if(!patientId)
    return null;

  const patient = patients[patientId];
 
  if(!patient)
    return null;


  return (
    <div className="App">
      <Container>
        <h2>
          {patient.name}
          {patient.gender === "male"
            ? <Icon name='mars' />
            : null
          }
          {patient.gender === "female"
            ? <Icon name='venus' />
            : null
          }
          {patient.gender === "other"
            ? <Icon name='genderless' />
            : null
          }
        </h2>
        <div>
          ssn: {patient.ssn}
          <br/>
          occupation: {patient.occupation}
        </div>
        <h3>entries</h3>
        {patient.entries && patient.entries.map((entry, index) => {
          return <EntryDetails key={index} entry={entry} />
        })}
      </Container>
    </div>
  );
};

export default PatientListPage;

