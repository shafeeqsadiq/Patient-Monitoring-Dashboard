const VitalSigns = require('../models/vitalSigns');

const vitalSignsController = {
    createVitalSigns: (req, res) => {
        const vitalSign = {
            patient_id: req.body.patient_id,
            heart_rate: req.body.heart_rate,
            blood_pressure: req.body.blood_pressure,
            temperature: req.body.temperature
        };
        
        console.log('Attempting to insert vital signs:', vitalSign);
        
        VitalSigns.create(vitalSign, (err) => {
            if (err) {
                console.error('Error inserting vital signs:', err);
                return res.status(500).json({ error: err.message });
            }
            console.log('Vital signs inserted successfully');
            res.json({ message: 'Vital signs recorded successfully' });
        });
    },
    

    getPatientVitalSigns: (req, res) => {
        const patientId = req.params.patientId;
        VitalSigns.getByPatientId(patientId, (err, vitalSigns) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(vitalSigns);
        });
    }
};

module.exports = vitalSignsController;
