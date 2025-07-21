export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.status = 'Bad Request, information is missing';
        break;
      case 401:
        this.status = 'Unauthorized, please log in';
        break;
      case 403:
        this.status = 'Unauthorized, access denied';
        break;
      case 404:
        this.status = 'Not Found, input did not match any records';
        break;
      case 405:
        this.status = 'Method not allowed';
        break;
      case statusCode.toString().startsWith('5'):
        this.status = 'Internal Server Error';
        break;
      default:
        this.status = 'Something went wrong, don´t know what!';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
