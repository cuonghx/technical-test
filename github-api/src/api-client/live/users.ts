import {
  UsersApiClientOptions,
  IUsersApiClient,
  UsersApiClientModel,
} from "../models/users";

// It will be read from a configuration file rather than hard-coded here
const BASE_URL = "https://api.github.com/search/users";

const options: UsersApiClientOptions = {
  endpoints: {
    fetchUsers: BASE_URL,
  },
};
const usersApiClient: IUsersApiClient = new UsersApiClientModel(options);

export { usersApiClient };
