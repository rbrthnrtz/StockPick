document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');
    const resultDiv = document.getElementById('result');

    stockForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const symbol = document.getElementById('symbol').value;

        try {
            const response = await fetch(`/stock/${symbol}`);
            const data = await response.json();

            if (data && data['Global Quote']) {
                const quote = data['Global Quote'];
                resultDiv.innerHTML = `
                    <h2>${symbol} Stock Data</h2>
                    <p>Open: ${quote['02. open']}</p>
                    <p>High: ${quote['03. high']}</p>
                    <p>Low: ${quote['04. low']}</p>
                    <p>Price: ${quote['05. price']}</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>Stock data not found.</p>';
            }
        } catch (error) {
            resultDiv.innerHTML = '<p>Error fetching stock data.</p>';
        }
    });
}); 