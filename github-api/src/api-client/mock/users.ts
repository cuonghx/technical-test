import {
  UsersApiClientOptions,
  IUsersApiClient,
  UsersApiClientModel,
} from "../models/users";

// It will be read from a configuration file rather than hard-coded here
const BASE_URL = "/static/mock-data/users/users.json";
const options: UsersApiClientOptions = {
  endpoints: {
    fetchUsers: BASE_URL,
  },
  mockDelay: 250,
};
const usersApiClient: IUsersApiClient = new UsersApiClientModel(options);

export { usersApiClient };
