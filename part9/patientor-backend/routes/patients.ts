import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  res.json(patientService.getEntry(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const entry = toNewPatientEntry(req.body);
    const newPatient = patientService.addEntry(entry);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

export default router;
