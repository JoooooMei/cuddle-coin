export const newUserAlert = (message) => {
  let errorObject = {
    type: '',
    message: '',
  };

  const messageList = message.split(': ');

  console.log(messageList);

  // Om epost eller lösenord inte möter kriterierna
  if (
    messageList[1] === 'email' ||
    messageList[1] === 'password' ||
    messageList[0] === 'User validation failed'
  ) {
    errorObject.type = messageList[1];
    errorObject.message = messageList[2];

    return errorObject;
  }

  // Om användarnamn eller epostadress är upptagna
  const messageType = messageList[0].split(' ');

  errorObject.type = messageType[0];
  errorObject.message = messageList[0];

  return errorObject;
};
