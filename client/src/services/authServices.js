const URL = 'http://localhost:3000/api/auth';

export const loginUser = async (user) => {
  const response = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const result = await response.json();

    return result.data.token;
  } else {
    return await response.json();
  }
};
