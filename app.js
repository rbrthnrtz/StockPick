const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.static('public'));

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY; // Retrieve API key from environment variable

    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        console.log(response.data);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error.message);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});