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
      authorization: `bearer ${jwt}`,
    },
  });

  if (response.ok) {
    return 'User deleted';
  }
};

export const getUserById = async (id, jwt) => {
  console.log('jwt; ', jwt);
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
