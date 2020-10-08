import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  res.json(patientService.getEntry(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const entry = utils.toNewPatientEntry(req.body);
    const newPatient = patientService.addEntry(entry);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getEntry(req.params.id);
  if(!patient)
    return res.status(404)
  try {
    const newEntry = utils.toNewEntry(req.body);
    const newPatient = patientService.addEntryToPatient(patient, newEntry);
    return res.json(newPatient);
  } catch(e) {
    return res.status(400).json({error: e.message});
  }
});

export default router;
