import Storage from '../models/Storage.mjs';

const logs = new Storage('../errorLogs', 'errorlogs.txt');

export const logger = async (err, req, res, next) => {
  const message = `\nERROR LOG\nURL: ${
    req.originalUrl
  }\nDate: ${new Date().toLocaleDateString(
    'sv-SE'
  )}\nTime: ${new Date().toLocaleTimeString('sv-SE')}\nSuccess: ${
    err.success
  }\nMessage: ${err.message}\n\n`;

  await logs.appendToFile(message);
  next(err, req, res);
};
