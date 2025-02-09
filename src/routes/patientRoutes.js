const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/patients', patientController.getAllPatients);
router.post('/patients', patientController.createPatient);
router.get('/patients/:id', patientController.getPatientById);
router.delete('/patients/:id', patientController.deletePatient);



module.exports = router;
