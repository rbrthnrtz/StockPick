const express = require('express'); // Import Express.js framework
const axios = require('axios'); // Import Axios for HTTP requests
const app = express(); // Initialize an Express application
const PORT = process.env.PORT || 3000; // Set the port number, default to 3000 if not provided in environment

require('dotenv').config(); // Load environment variables from a .env file

app.use(express.static('public')); // Serve static files from the 'public' directory

// Define a route for GET requests to '/stock/:symbol'
app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol; // Extract stock symbol from the request parameters
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY; // Retrieve API key from environment variable

    try {
        // Make an HTTP GET request to the Alpha Vantage API
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        console.log(response.data); // Log the response data
        const data = response.data; // Extract data from the response
        res.json(data); // Send the data back to the client in JSON format
    } catch (error) {
        console.error('Error fetching stock data:', error.message); // Log any errors
        res.status(500).json({ error: 'Failed to fetch stock data' }); // Send a 500 Internal Server Error response
    }
});

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
});