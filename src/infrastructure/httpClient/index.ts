import fetch, { BodyInit as BodyType, Headers, Request, RequestInit, Response } from "node-fetch";
import { ApplicationError } from "../../application/shared/errors/ApplicationError";
import resources, { resourceKeys } from "../../application/shared/locals/index";
import * as resultCodes from "../../application/shared/errors/codes.json";
export { BodyInit as BodyType, Headers } from "node-fetch";
import { Options } from "./Options";
import TResponse from "./TResponse";

const serialization = {
  json: "json",
  string: "string",
  buffer: "buffer",
  arrayBuffer: "arrayBuffer",
};

class HttpClient {
  Methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DEL: "DELETE",
    PATCH: "PATCH",
    HEAD: "HEAD",
  };
  SerializationMethod = serialization;
  async Send<T, E>(
    url: string,
    method = this.Methods.GET,
    {
      body,
      headers,
      options,
      serializationMethod = this.SerializationMethod.json,
    }: {
      body?: BodyType;
      headers?: Headers;
      options?: Options;
      serializationMethod?: string;
    },
  ): Promise<TResponse<T, E>> {
    const request = BuildRequest(url, method, body, headers, options);
    const result = new TResponse<T, E>();
    try {
      const response = await fetch(url, request);
      if (response.ok) {
        result.SetResponse(await ProcessResponseData<T>(response, serializationMethod));
      } else {
        result.SetErrorMessage(response.statusText);
        result.SetErrorResponse(await ProcessErrorResponse<E>(response));
        result.SetStatusCode(response.status);
      }
      result.SetStatusCode(response.status);
    } catch (error) {
      result.SetErrorMessage(error.message);
      result.SetStatusCode(error.code || null);
      result.SetError(error);
    }
    return result;
  }
}

function BuildRequest(
  url: string,
  method: string,
  body?: BodyType,
  headers?: Headers,
  options?: RequestInit,
): Request {
  if (!options) {
    options = new Options();
  }
  options.method = method;
  if (body) {
    options.body = body;
  }
  if (headers) {
    options.headers = headers;
  }
  const request = new Request(url, options);
  const optionsKey = Object.keys(options);
  optionsKey.forEach((key) => {
    if (key !== "method" && key !== "body" && key !== "headers") {
      request[key] = options[key];
    }
  });
  return request;
}

async function ProcessErrorResponse<E>(response: Response): Promise<E> {
  return await response.json();
}

async function ProcessResponseData<T>(
  response: Response,
  serializationMethod: string,
): Promise<T | string | Buffer | ArrayBuffer> {
  try {
    switch (serializationMethod) {
      case serialization.buffer:
        return await response.buffer();
      case serialization.arrayBuffer:
        return await response.arrayBuffer();
      case serialization.string:
        return await response.text();
      default:
        return await response.json();
    }
  } catch (error) {
    throw new ApplicationError(
      resources.Get(resourceKeys.PROCESSING_DATA_CLIENT_ERROR),
      error?.code || resultCodes.INTERNAL_SERVER_ERROR,
      JSON.stringify(error),
    );
  }
}

const instance = new HttpClient();

export default instance;
