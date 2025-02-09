const Patient = require('../models/patient');

const patientController = {
    getAllPatients: (req, res) => {
        Patient.getAll((err, patients) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(patients);
        });
    },

    createPatient: (req, res) => {
        const { name, age, gender } = req.body;
        Patient.create({ name, age, gender }, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Patient created successfully' });
        });
    },

    getPatientById: (req, res) => {
        const id = req.params.id;
        Patient.findById(id, (err, patient) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.json(patient);
        });
    },

    deletePatient: (req, res) => {
        const id = req.params.id;
        Patient.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Patient deleted successfully' });
        });
    }
    
    

};

module.exports = patientController;
