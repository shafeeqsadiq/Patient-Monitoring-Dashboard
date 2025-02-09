const db = require('../config/database');

const VITAL_SIGNS_THRESHOLDS = {
    heart_rate: { min: 60, max: 100 },
    blood_pressure: {
        systolic: { min: 90, max: 120 },
        diastolic: { min: 60, max: 80 }
    },
    temperature: { min: 97, max: 99 }
};

class VitalSigns {
    static create(vitalSign, callback) {
        const sql = 'INSERT INTO vital_signs (patient_id, heart_rate, blood_pressure, temperature) VALUES (?, ?, ?, ?)';
        
        // Check thresholds and generate alerts if needed
        const alerts = this.checkThresholds(vitalSign);
        
        db.run(sql, [
            vitalSign.patient_id,
            vitalSign.heart_rate,
            vitalSign.blood_pressure,
            vitalSign.temperature
        ], function(err) {
            if (err) {
                console.error('Database error:', err);
                return callback(err);
            }

            // If there are alerts, create them
            if (alerts.length > 0) {
                const alertSql = 'INSERT INTO alerts (patient_id, message, severity) VALUES (?, ?, ?)';
                alerts.forEach(alert => {
                    db.run(alertSql, [vitalSign.patient_id, alert.message, alert.severity]);
                });
            }
            
            callback(null, this.lastID);
        });
    }

    static getByPatientId(patientId, callback) {
        const sql = 'SELECT * FROM vital_signs WHERE patient_id = ? ORDER BY timestamp DESC';
        db.all(sql, [patientId], callback);
    }

    static checkThresholds(vitalSign) {
        const alerts = [];
        
        // Check heart rate
        if (vitalSign.heart_rate < VITAL_SIGNS_THRESHOLDS.heart_rate.min) {
            alerts.push({
                message: `Low heart rate detected: ${vitalSign.heart_rate} bpm`,
                severity: 'high'
            });
        } else if (vitalSign.heart_rate > VITAL_SIGNS_THRESHOLDS.heart_rate.max) {
            alerts.push({
                message: `High heart rate detected: ${vitalSign.heart_rate} bpm`,
                severity: 'high'
            });
        }

        // Check blood pressure
        const [systolic, diastolic] = vitalSign.blood_pressure.split('/').map(Number);
        if (systolic > VITAL_SIGNS_THRESHOLDS.blood_pressure.systolic.max) {
            alerts.push({
                message: `High systolic blood pressure: ${systolic}`,
                severity: 'high'
            });
        }
        if (diastolic > VITAL_SIGNS_THRESHOLDS.blood_pressure.diastolic.max) {
            alerts.push({
                message: `High diastolic blood pressure: ${diastolic}`,
                severity: 'high'
            });
        }

        // Check temperature
        if (vitalSign.temperature > VITAL_SIGNS_THRESHOLDS.temperature.max) {
            alerts.push({
                message: `High temperature detected: ${vitalSign.temperature}°F`,
                severity: 'high'
            });
        } else if (vitalSign.temperature < VITAL_SIGNS_THRESHOLDS.temperature.min) {
            alerts.push({
                message: `Low temperature detected: ${vitalSign.temperature}°F`,
                severity: 'high'
            });
        }

        return alerts;
    }

    static getStatistics(patientId, callback) {
        const sql = `
            SELECT 
                AVG(heart_rate) as avg_heart_rate,
                MIN(heart_rate) as min_heart_rate,
                MAX(heart_rate) as max_heart_rate,
                AVG(CAST(temperature as FLOAT)) as avg_temperature,
                MIN(temperature) as min_temperature,
                MAX(temperature) as max_temperature
            FROM vital_signs 
            WHERE patient_id = ?
        `;
        db.get(sql, [patientId], callback);
    }
}

module.exports = VitalSigns;
