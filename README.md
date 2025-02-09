# Patient Monitoring Dashboard

A real-time patient monitoring system designed to track vital signs and predict potential health emergencies in elderly patients living alone.

## Project Overview

This system provides continuous monitoring of patient vital signs including heart rate, blood pressure, and temperature. It features real-time statistical analysis, trend visualization, and automated alerts for abnormal readings.

## Technologies Used

### Backend
- Node.js
- Express.js
- SQLite Database
- WebSocket (ws)
- Python (for data simulation)

### Frontend
- React.js
- Chart.js for data visualization
- Axios for API calls
- WebSocket client for real-time updates

## Features

- Real-time vital signs monitoring
- Statistical analysis of patient data
- Multi-patient monitoring (up to 10 patients)
- Automated alerts for abnormal readings
- Interactive data visualization
- Patient management system

## Important Note

This project currently uses simulated data generated through a Python program as no physical wearable devices are connected. The simulation provides realistic vital signs data including:
- Heart Rate (40-180 bpm)
- Blood Pressure (80/50 - 200/130 mmHg)
- Temperature (95.0-105.0°F)

## Setup and Installation

### Prerequisites
- Node.js
- npm
- Python 3.x
- Postman (for testing API endpoints)

### Running the Application

1. Start the backend server:
```bash
cd patient-monitoring/src
npm run dev
```

2. Start the frontend application:
```bash
cd patient-monitoring/src/client
npm start
```

## API Documentation

### Adding a Patient
```bash
POST http://localhost:3000/api/patients
Content-Type: application/json

{
    "name": "Jane Smith",
    "age": 45,
    "gender": "female"
}
```

### Deleting a Patient
```bash
DELETE http://localhost:3000/api/patients/{id}
```
Replace {id} with the patient's ID

### Viewing All Patients
```bash
GET http://localhost:3000/api/patients
```

## Future Enhancements
- Integration with real wearable devices
- Enhanced alert system
- Mobile application development
- Advanced pattern recognition
- Integration with healthcare systems

