const URL = 'http://localhost:3000/api/users';

export const getAllUsers = async (jwt) => {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      authorization: `bearer ${jwt}`,
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

export const deleteUserById = async (user, jwt) => {
  const response = await fetch(`${URL}/${user}`, {
    method: 'DELETE',
    headers: {
      authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODAwMjgzYjAyZDA4ZTk1OWU5ZmE1ZSIsInJvbGUiOlsidXNlciIsImFkbWluIiwibWluZXIiXSwiaWF0IjoxNzUzODcxNTQ2LCJleHAiOjE3NTQ0NzYzNDZ9.LkZ3jokrA-dnqLHeN21IzLQ1I4VTVcUMT2TGt-DdxtU',
    },
  });

  if (response.ok) {
    return 'User deleted';
  }
};

export const getUserById = async (id, jwt) => {
  console.log(jwt);
  const response = await fetch(`${URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${jwt}`,
    },
  });

  const result = await response.json();

  return result;
};

/* expired token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODAwMjgzYjAyZDA4ZTk1OWU5ZmE1ZSIsInJvbGUiOlsidXNlciIsImFkbWluIiwibWluZXIiXSwiaWF0IjoxNzUzMjIwMDA5LCJleHAiOjE3NTM4MjQ4MDl9.jAq_okOq-b4HT1qS0kWM4A-ub_Z0r2zN1-016r90htc
*/
