const VITAL_SIGNS_THRESHOLDS = {
    heart_rate: { min: 60, max: 100 },
    blood_pressure: {
        systolic: { min: 90, max: 120 },
        diastolic: { min: 60, max: 80 }
    },
    temperature: { min: 97, max: 99 }
};

module.exports = { VITAL_SIGNS_THRESHOLDS };
