import { IUsersApiClient } from "./IUsersApiClient";
import { IUser } from "@/models/users/IUser";
import {
  IHttpRequestParams,
  HttpRequestType,
  httpClient,
} from "@/http-client";

export interface UsersApiClientEndpoint {
  fetchUsers: string;
}
export interface UsersApiClientOptions {
  mockDelay?: number;
  endpoints: UsersApiClientEndpoint;
}

export class UsersApiClientModel implements IUsersApiClient {
  private readonly endpoints!: UsersApiClientEndpoint;
  private readonly mockDelay: number = 0;

  constructor(options: UsersApiClientOptions) {
    this.endpoints = options.endpoints;
    if (options.mockDelay) {
      this.mockDelay = options.mockDelay;
    }
  }

  fetchUsers(
    payload: {
      [key: string]: string | number;
    },
    abortSignal?: AbortSignal
  ): Promise<IUser[]> {
    const requestParameters: IHttpRequestParams = {
      requestType: HttpRequestType.get,
      endpoint: this.endpoints.fetchUsers,
      requiresToken: false,
      mockDelay: this.mockDelay,
      payload: payload,
      abortSignal,
    };
    return httpClient.request<IUser[]>(requestParameters);
  }
}
