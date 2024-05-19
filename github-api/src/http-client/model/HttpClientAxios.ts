import axios, { AxiosRequestConfig } from "axios";
import { IHttpRequestParams } from "./IHttpRequestParams";
import { IHttpClient } from "./IHttpClient";
import { HttpRequestType } from "./Constants";
import { UrlUtils } from "./UrlUtils";

export class HttpClientAxios implements IHttpClient {
  async request<R>(paramenters: IHttpRequestParams): Promise<R> {
    const {
      requestType,
      endpoint,
      requiresToken,
      payload,
      headers,
      mockDelay,
      abortSignal,
    } = paramenters;
    const fullUrl = UrlUtils.getFullUrlWithParams(endpoint, payload);
    console.log("[HttpClientAxios]: [FullUrl]: ", fullUrl, payload);
    const options: AxiosRequestConfig = {
      headers: {},
    };
    if (headers) {
      options.headers = { ...headers };
    }
    if (requiresToken && options.headers) {
      options.withCredentials = true;
      // options.headers.Authorization = `bearer ${token}`
    }
    if (abortSignal) {
      options.signal = abortSignal;
    }
    let result!: R;
    try {
      switch (requestType) {
        case HttpRequestType.get: {
          const response = await axios.get(fullUrl, options);
          result = response?.data.items as R;
          break;
        }
        default:
          console.warn(
            "HttpClientAxios: Invalid requestType argument or Request type not implemented"
          );
      }
    } catch (error) {
      console.error("HttpClientAxios: [Exeption]]:", error);
      throw error;
    }

    if ((mockDelay || 0) > 0) {
      return new Promise<R>((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, mockDelay);
      });
    }
    return result;
  }
}
