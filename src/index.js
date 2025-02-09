const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes.js');
const vitalSignsRoutes = require('./routes/vitalSignsRoutes');
const alertRoutes = require('./routes/alertRoutes');
const http = require('http');
const DeviceSimulator = require('./services/deviceSimulator');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server with the HTTP server
const wss = new WebSocket.Server({ server });

// Initialize device simulator with WebSocket server instance
const deviceSimulator = new DeviceSimulator(wss);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', patientRoutes);
app.use('/api', vitalSignsRoutes);
app.use('/api', alertRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Patient Monitoring System API' });
});

// Use server.listen instead of app.listen
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
