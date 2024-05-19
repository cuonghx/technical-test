import { IUsersApiClient } from "./users";

export interface IApiClient {
  users: IUsersApiClient;
}
