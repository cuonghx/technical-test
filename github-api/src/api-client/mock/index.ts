import { IApiClient } from "../models/IApiClient";
import { usersApiClient } from "./users";

export const apiMockClient: IApiClient = {
  users: usersApiClient,
};
