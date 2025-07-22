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
