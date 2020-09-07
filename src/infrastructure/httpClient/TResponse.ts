import { Headers } from "node-fetch";

export default class TResponse<T, E> {
  response: T | E | string | Buffer | ArrayBuffer | PromiseLike<T> | PromiseLike<E>;
  success = true;
  statusCode: number;
  message: string;
  error: Error;
  headers: Headers;
  SetResponse(data: string | T | Buffer | ArrayBuffer | PromiseLike<T>): void {
    this.response = data;
  }
  SetErrorResponse(data: E | PromiseLike<E>): void {
    this.response = data;
  }
  SetStatusCode(code: number): void {
    this.statusCode = code;
  }
  SetErrorMessage(message: string): void {
    this.message = message;
    this.success = false;
  }
  SetError(error: Error): void {
    this.error = error;
    this.success = false;
  }
  SetResponseHeaders(headers: Headers): void {
    this.headers = headers;
  }
}
