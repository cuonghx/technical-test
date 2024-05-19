import { IHttpRequestParams } from "./IHttpRequestParams";
export interface IHttpClientConfig {
  tokenKey: string;
  clientType: string;
}
export interface IHttpClient {
  request<R>(paramenters: IHttpRequestParams): Promise<R>;
}
