import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const entry = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  const newPatient = patientService.addEntry(entry);
  res.json(newPatient);

});

export default router;
