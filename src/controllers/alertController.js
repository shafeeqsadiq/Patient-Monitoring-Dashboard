const Alert = require('../models/alert');

const alertController = {
    createAlert: (req, res) => {
        const alert = {
            patient_id: req.body.patient_id,
            message: req.body.message,
            severity: req.body.severity
        };
        
        Alert.create(alert, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Alert created successfully' });
        });
    },

    getPatientAlerts: (req, res) => {
        const patientId = req.params.patientId;
        Alert.getByPatientId(patientId, (err, alerts) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(alerts);
        });
    }
};

module.exports = alertController;
