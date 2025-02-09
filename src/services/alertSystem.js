class AlertSystem {
    constructor() {
        this.alerts = [];
    }

    checkVitalSigns(vitalSigns) {
        const alerts = [];

        // Heart Rate Checks
        if (vitalSigns.heart_rate < 60 || vitalSigns.heart_rate > 100) {
            alerts.push({
                message: `Abnormal heart rate: ${vitalSigns.heart_rate}`,
                severity: 'high',
                color: 'red',
                timestamp: new Date().toISOString()
            });
        }

        // Blood Pressure Checks
        const [systolic, diastolic] = vitalSigns.blood_pressure.split('/').map(Number);
        if (systolic > 140 || systolic < 90) {
            alerts.push({
                message: `Abnormal blood pressure: ${vitalSigns.blood_pressure}`,
                severity: 'medium',
                color: 'orange',
                timestamp: new Date().toISOString()
            });
        }

        // Temperature Checks
        if (vitalSigns.temperature > 99.5 || vitalSigns.temperature < 97.5) {
            alerts.push({
                message: `Abnormal temperature: ${vitalSigns.temperature}°F`,
                severity: 'low',
                color: 'yellow',
                timestamp: new Date().toISOString()
            });
        }

        return alerts;
    }
}
