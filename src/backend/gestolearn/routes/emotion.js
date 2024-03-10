const WebSocket = require('ws');
const { spawn } = require('child_process');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
    console.log('A client connected');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        // Example of invoking Python script - adjust according to your needs
        const pythonProcess = spawn('python', ['../../../machine-learning/emotion-detection/main.py']);

        pythonProcess.stdout.on('data', (data) => {
            // Assuming your Python script outputs the emotion detected
            ws.send(data.toString());
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

console.log('WebSocket server started on ws://localhost:8000');
