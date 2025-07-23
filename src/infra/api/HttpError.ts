export class HttpError {
  statusCode: number;
  message: string | string[];

  constructor(message: string | string[], statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
