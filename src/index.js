const express = require('express');
const app = express();
const axios = require('axios');

const PORT = 3000;
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';

app.get('/', (req, res) => {
    console.log("Default route accessed");
    res.send('Hello from the Express.js server!');
});

app.get('/test-ollama', async (req, res) => {
    console.log(`Testing Ollama using ${OLLAMA_API_URL}`);
    try {
        console.log("attemping access");
        const response = await axios.get(OLLAMA_API_URL);
        res.send(`Connected to Ollama API: ${response.data}`);
    } catch (error) {
        res.send(`Error connecting to Ollama API: ${error.message}`);
    }

    console.log("Test completed");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});