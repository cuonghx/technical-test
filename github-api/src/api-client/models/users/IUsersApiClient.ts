import { IUser } from "@/models/users/IUser";

export interface IUsersApiClient {
  fetchUsers: (
    payload: {
      [key: string]: string | number;
    },
    abortSignal?: AbortSignal
  ) => Promise<IUser[]>;
}
