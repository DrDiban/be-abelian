const express = require('express');
const cors = require('cors'); // Import cors
const { exec } = require('child_process');

const app = express();
const PORT = 1000;

// Use CORS middleware
app.use(cors({
    origin: 'http://13.251.40.215' // Replace with your frontend's URL
}));

// Initialize the counter in memory
let counter = 0;

// Endpoint to get Abelminer version
app.get('/api/getAbelminerVersion', (req, res) => {
    // Run 'abelminer --version' command in the terminal
    exec('/usr/local/bin/abelminer --version', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error running the Python command.');
        }
        if (stderr) {
            // Note: 'Abelminer --version' typically sends output to stderr, so we handle it here
            console.log(`Stderr (Abelminer Version): ${stderr}`);
            return res.send({ version: stderr.trim() }); // Send back the version
        }
        res.send({ version: stdout.trim() }); // Fallback if output goes to stdout
    });
});

// Endpoint to increase the counter
app.post('/api/increaseCounter', (req, res) => {
    counter += 1;
    res.send({ message: "Updated sucessfully" }); // Send both counter and message
});
// Endpoint to get the current value of the counter
app.get('/api/getCounter', (req, res) => {
    res.send({ counter });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});