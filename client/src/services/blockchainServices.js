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

export const getAllTransactions = async (jwt) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/wallet/transactions',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${jwt}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      return await response.json();
    }
  } catch (error) {}
};

export const submitTransaction = async (trx, jwt) => {
  console.log('Got in');
  try {
    const response = await fetch(
      'http://localhost:3000/api/wallet/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${jwt}`,
        },
        body: JSON.stringify(trx),
      }
    );

    console.log('response: ', response);

    if (response.ok) {
      const result = await response.json();
      console.log('result: ', result);
      return result;
    } else {
      return response;
    }
  } catch (error) {
    console.error('Något gick fel:', response.status, await response.text());
  }
};

export const mine = async (jwt) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/wallet/transactions/mine',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${jwt}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {}
};

export const getBalance = async (jwt) => {
  try {
    const response = await fetch('http://localhost:3000/api/wallet/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${jwt}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {}
};
