// deviceSimulator.js
const WebSocket = require('ws');

class DeviceSimulator {
    constructor(wss) {  // Change parameter to accept WebSocket server instance
        this.wss = wss; // Use the passed WebSocket server instance
        this.startStream();
    }

    generateVitalSigns() {
        // Helper function to randomly choose from ranges
        const chooseRange = (ranges) => ranges[Math.floor(Math.random() * ranges.length)];

        const heartRateRanges = [
            () => Math.floor(Math.random() * (59 - 40) + 40),    // Low
            () => Math.floor(Math.random() * (100 - 60) + 60),   // Normal
            () => Math.floor(Math.random() * (180 - 101) + 101)  // High
        ];

        const bpRanges = [
            () => `${Math.floor(Math.random() * (109 - 80) + 80)}/${Math.floor(Math.random() * (69 - 50) + 50)}`,     // Low
            () => `${Math.floor(Math.random() * (140 - 110) + 110)}/${Math.floor(Math.random() * (90 - 70) + 70)}`,   // Normal
            () => `${Math.floor(Math.random() * (200 - 141) + 141)}/${Math.floor(Math.random() * (130 - 91) + 91)}`   // High
        ];

        const tempRanges = [
            () => Number((Math.random() * (97.4 - 95.0) + 95.0).toFixed(1)),    // Low
            () => Number((Math.random() * (99.5 - 97.5) + 97.5).toFixed(1)),    // Normal
            () => Number((Math.random() * (105.0 - 99.6) + 99.6).toFixed(1))    // High
        ];

        return {
            heart_rate: chooseRange(heartRateRanges)(),
            blood_pressure: chooseRange(bpRanges)(),
            temperature: chooseRange(tempRanges)()
        };
    }

    startStream() {
        this.wss.on('connection', (ws) => {
            const interval = setInterval(() => {
                const vitalSigns = this.generateVitalSigns();
                ws.send(JSON.stringify(vitalSigns));
            }, 5000);

            ws.on('close', () => clearInterval(interval));
        });
    }
}

module.exports = DeviceSimulator;
