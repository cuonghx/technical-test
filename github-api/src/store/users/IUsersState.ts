import { IUser } from "@/models/users/IUser";
export interface IUsersState {
  loading: boolean;
  users: IUser[];
  error: string;
}
