const db = require('../config/database');

class Alert {
    static create(alert, callback) {
        const sql = 'INSERT INTO alerts (patient_id, message, severity) VALUES (?, ?, ?)';
        db.run(sql, [alert.patient_id, alert.message, alert.severity], callback);
    }

    static getByPatientId(patientId, callback) {
        const sql = 'SELECT * FROM alerts WHERE patient_id = ? ORDER BY timestamp DESC';
        db.all(sql, [patientId], callback);
    }
}

module.exports = Alert;
