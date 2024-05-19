import { IApiClient } from "../models/IApiClient";
import { usersApiClient } from "./users";

export const apiLiveClient: IApiClient = {
  users: usersApiClient,
};
