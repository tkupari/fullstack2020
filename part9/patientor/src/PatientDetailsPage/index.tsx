import React, { ReactHTML } from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";
import { useParams } from "react-router-dom";

const ShowEntry: React.FC<{entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      {entry.date} <em>{entry.description}</em>
      <ul>
        {entry.diagnosisCodes?.map((d, i) =>
          <li key={i}>{d} {diagnoses[d].name}</li>
        )}
      </ul>
    </div>
  )

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
          return <ShowEntry key={index} entry={entry} />
        })}
      </Container>
    </div>
  );
};

export default PatientListPage;

