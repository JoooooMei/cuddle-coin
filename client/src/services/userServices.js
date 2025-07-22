const URL = 'http://localhost:3000/api/users';

export const getAllUsers = async () => {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODAwMjgzYjAyZDA4ZTk1OWU5ZmE1ZSIsInJvbGUiOlsidXNlciIsImFkbWluIiwibWluZXIiXSwiaWF0IjoxNzUzMjIwMDA5LCJleHAiOjE3NTM4MjQ4MDl9.jAq_okOq-b4HT1qS0kWM4A-ub_Z0r2zN1-016r90htc',
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

export const deleteUserById = async (user) => {
  const response = await fetch(`${URL}/${user}`, {
    method: 'DELETE',
    headers: {
      authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODAwMjgzYjAyZDA4ZTk1OWU5ZmE1ZSIsInJvbGUiOlsidXNlciIsImFkbWluIiwibWluZXIiXSwiaWF0IjoxNzUzMjIwMDA5LCJleHAiOjE3NTM4MjQ4MDl9.jAq_okOq-b4HT1qS0kWM4A-ub_Z0r2zN1-016r90htc',
    },
  });

  if (response.ok) {
    return 'User deleted';
  }
};
