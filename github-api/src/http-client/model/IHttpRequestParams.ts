import { HttpRequestType } from "./Constants";
export interface IHttpRequestParams {
  requestType: HttpRequestType;
  endpoint: string;
  requiresToken: boolean;
  headers?: { [key: string]: string };
  payload?: { [key: string]: string | number };
  mockDelay?: number;
  abortSignal?: AbortSignal;
}
