export const getBlockchain = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/blocks', {
      method: 'GET',
      headers: {},
    });

    if (response.ok) {
      const result = await response.json();

      return result;
    } else {
      console.error('Något gick fel:', response.status, await response.text());
    }
  } catch (error) {}
};

export const submitTransaction = async (trx) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/wallet/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:
            'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGExNWM5ZWZhNTcwMzdhMzc0ZmExZiIsInJvbGUiOlsidXNlciJdLCJpYXQiOjE3NTM4ODAwMzMsImV4cCI6MTc1NDQ4NDgzM30.KN8qeZxOEO7aAtIdw3tqjqR8nEJvK1ZXM_5H2NP4gI8',
        },
        body: JSON.stringify(trx),
      }
    );
  } catch (error) {}
};
