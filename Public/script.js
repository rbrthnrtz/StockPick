// Add event listener for the 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded', () => {
    // Get the stock form and result div elements from the DOM
    const stockForm = document.getElementById('stock-form');
    const resultDiv = document.getElementById('result');

    // Add event listener for the 'submit' event on the stock form
    stockForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submit action
        const symbol = document.getElementById('symbol').value; // Get the stock symbol from the form

        try {
            // Make an asynchronous HTTP request to the server
            const response = await fetch(`/stock/${symbol}`);
            const data = await response.json(); // Parse the JSON response

            // Check if data is received and contains the 'Global Quote' field
            if (data && data['Global Quote']) {
                const quote = data['Global Quote']; // Extract the quote data
                // Set the result div's innerHTML to show the stock data
                resultDiv.innerHTML = `
                    <h2>${symbol} Stock Data</h2>
                    <p>Open: ${quote['02. open']}</p>
                    <p>High: ${quote['03. high']}</p>
                    <p>Low: ${quote['04. low']}</p>
                    <p>Price: ${quote['05. price']}</p>
                `;
            } else {
                // Set the result div to show 'Stock data not found'
                resultDiv.innerHTML = '<p>Stock data not found.</p>';
            }
        } catch (error) {
            // Set the result div to show an error message if fetch fails
            resultDiv.innerHTML = '<p>Error fetching stock data.</p>';
        }
    });
});