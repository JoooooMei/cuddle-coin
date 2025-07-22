const URL = 'http://localhost:3000/api/users';

export const getAllUsers = async () => {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2UzYzU2Zjc0OTA1ZGYwMTMwMDI2YSIsInJvbGUiOlsiYWRtaW4iLCJtaW5lciJdLCJpYXQiOjE3NTMxMTQ5MTgsImV4cCI6MTc1MzcxOTcxOH0.0xthy04aZnxOJ4TtYGQ1lSCUQyQ7cuU5iLbayHYZCf0',
    },
  });

  if (response.ok) {
    const result = await response.json();

    return result;
  }
};

export const addUser = async (newUser) => {
  const response = await fetch(`${URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (response.ok) {
    const result = await response.json();

    return result;
  } else {
    return await response.json();
  }
};
