import { IUser } from "@/models/users/IUser";

export const transformRawUsersData = (users: IUser[]): IUser[] => {
  return users.map((user) => ({
    avatar_url: user.avatar_url,
    id: user.id,
    score: user.score,
    login: user.login,
    type: user.type,
  }));
};
