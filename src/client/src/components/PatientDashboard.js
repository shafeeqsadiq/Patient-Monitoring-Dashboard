import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

class AlertSystem {
    checkVitalSigns(vitalSigns) {
        const alerts = [];
        if (vitalSigns.heart_rate > 100 || vitalSigns.heart_rate < 60) {
            alerts.push({
                id: Date.now(),
                message: `Abnormal heart rate detected: ${vitalSigns.heart_rate}`,
                severity: 'high',
                timestamp: new Date().toISOString()
            });
        }
        return alerts;
    }
}

function PatientDashboard() {
    const [selectedPatient, setSelectedPatient] = useState('1');
    const [selectedSeverity, setSelectedSeverity] = useState('all');
    const [patients, setPatients] = useState([]);
    const [vitalSigns, setVitalSigns] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [stats, setStats] = useState({
        heart_rate: { mean: 0, min: 0, max: 0 },
        temperature: { mean: 0, min: 0, max: 0 }
    });

    const calculateStats = (vitalSignsData) => {
        if (vitalSignsData.length === 0) return;

        const heartRates = vitalSignsData.map(v => v.heart_rate);
        const temperatures = vitalSignsData.map(v => v.temperature);

        setStats({
            heart_rate: {
                mean: Math.round(heartRates.reduce((a, b) => a + b) / heartRates.length),
                min: Math.min(...heartRates),
                max: Math.max(...heartRates)
            },
            temperature: {
                mean: Number((temperatures.reduce((a, b) => a + b) / temperatures.length).toFixed(1)),
                min: Math.min(...temperatures),
                max: Math.max(...temperatures)
            }
        });
    };

    const fetchData = useCallback(async (patientId) => {
        try {
            console.log('Fetching data for patient:', patientId);
            const [patientsRes, vitalsRes, alertsRes] = await Promise.all([
                axios.get('http://localhost:3000/api/patients'),
                axios.get(`http://localhost:3000/api/vital-signs/${patientId}`),
                axios.get(`http://localhost:3000/api/alerts/${patientId}`)
            ]);
    
            console.log('Patients response:', patientsRes.data);
            console.log('Vitals response:', vitalsRes.data);
            console.log('Alerts response:', alertsRes.data);
    
            setPatients(patientsRes.data);
            setVitalSigns(vitalsRes.data);
            setAlerts(alertsRes.data);
            calculateStats(vitalsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);
    

    useEffect(() => {
        fetchData(selectedPatient);

        const ws = new WebSocket('ws://localhost:3000');
        const alertSystem = new AlertSystem();

        ws.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            
            setVitalSigns(prevSigns => {
                const updatedSigns = [...prevSigns, {
                    ...newData,
                    id: Date.now(),
                    timestamp: new Date().toISOString()
                }].slice(-10);
                calculateStats(updatedSigns);
                return updatedSigns;
            });

            const newAlerts = alertSystem.checkVitalSigns(newData);
            if (newAlerts.length > 0) {
                setAlerts(prevAlerts => [...prevAlerts, ...newAlerts].slice(-20));
            }
        };

        return () => ws.close();
    }, [selectedPatient, fetchData]);

    useEffect(() => {
        const filtered = alerts.filter(alert => 
            selectedSeverity === 'all' || alert.severity === selectedSeverity
        );
        setFilteredAlerts(filtered);
    }, [selectedSeverity, alerts]);

    const vitalSignsData = {
        labels: vitalSigns.map(v => v.timestamp),
        datasets: [
            {
                label: 'Heart Rate',
                data: vitalSigns.map(v => v.heart_rate),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            },
            {
                label: 'Temperature',
                data: vitalSigns.map(v => v.temperature),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div className="dashboard-container">
            <h1>Patient Monitoring Dashboard</h1>
            
            <div className="selector">
                <select 
                    value={selectedPatient} 
                    onChange={(e) => setSelectedPatient(e.target.value)}
                >
                    {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="stats-summary">
                <h2>Statistical Summary</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Heart Rate Statistics</h3>
                        <p>Average: {stats.heart_rate.mean} bpm</p>
                        <p>Minimum: {stats.heart_rate.min} bpm</p>
                        <p>Maximum: {stats.heart_rate.max} bpm</p>
                    </div>
                    <div className="stat-card">
                        <h3>Temperature Statistics</h3>
                        <p>Average: {stats.temperature.mean}°F</p>
                        <p>Minimum: {stats.temperature.min}°F</p>
                        <p>Maximum: {stats.temperature.max}°F</p>
                    </div>
                </div>
            </div>

            <div className="vital-signs-chart">
                <h2>Vital Signs Trend</h2>
                <Line data={vitalSignsData} />
            </div>

            <div className="alert-filter">
                <select 
                    value={selectedSeverity} 
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                >
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <div className="alerts">
                <h2>Alerts</h2>
                {filteredAlerts.map(alert => (
                    <div key={alert.id} className="alert-card">
                        <p><strong>Message:</strong> {alert.message}</p>
                        <p className={`severity-${alert.severity}`}>
                            <strong>Severity:</strong> {alert.severity}
                        </p>
                        <p className="timestamp">
                            <strong>Time:</strong> {alert.timestamp}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientDashboard;
