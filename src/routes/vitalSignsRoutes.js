const express = require('express');
const router = express.Router();
const vitalSignsController = require('../controllers/vitalSignsController');

router.post('/vital-signs', vitalSignsController.createVitalSigns);
router.get('/vital-signs/:patientId', vitalSignsController.getPatientVitalSigns);

module.exports = router;
