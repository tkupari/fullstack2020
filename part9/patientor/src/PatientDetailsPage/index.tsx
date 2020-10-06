import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientListPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientDetails = async (patientId: string) => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch({ type: "SET_PATIENT_DETAILS", payload: patientDetails });
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
      </Container>
    </div>
  );
};

export default PatientListPage;

