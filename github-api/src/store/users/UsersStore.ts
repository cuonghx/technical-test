import { useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { IRootState } from "../root";
import { usersStoreSlice } from "./UsersSlice";
import { apiClient } from "@/api-client";
import { CanceledError, AxiosError } from "axios";
import { IUser } from "@/models/users/IUser";
import { sleep } from "@/utils/common";
import { transformRawUsersData } from "./utils";
import { searchResultsCache } from "./SearchResultsCache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useUsersActions(dispatch: Dispatch<any>) {
  const { setLoading, setUsers, setError } = usersStoreSlice.actions;
  const actions = {
    searchUsers: (query: string, signal: AbortSignal) => {
      async function execute() {
        try {
          dispatch(setLoading(true));
          let data;
          const cachedData = searchResultsCache.get(query);
          if (cachedData) {
            data = cachedData as IUser[];
          } else {
            const rawUsers = await apiClient.users.fetchUsers(
              {
                q: query,
                per_page: 100,
              },
              signal
            );
            data = transformRawUsersData(rawUsers);
          }
          dispatch(setUsers(data));
          searchResultsCache.set(query, data);
        } catch (error: unknown) {
          // Aborting request will return an error we don't want to handle in redux
          if (error instanceof CanceledError && error.code === "ERR_CANCELED") {
            return;
          }
          const response = (error as AxiosError).response;
          if (
            response &&
            (response.status === 429 || response.status === 403)
          ) {
            const xRateLimitReset = response?.headers["x-ratelimit-reset"];
            if (xRateLimitReset !== null) {
              const nowInSeconds = Math.round(new Date().valueOf() / 1000);
              const secondsToWait = xRateLimitReset - nowInSeconds;
              // Retry only if we need to wait fewer than 3 seconds
              if (secondsToWait < 3) {
                await sleep(secondsToWait * 1000 + 100);
                execute();
              } else {
                // provide useful feedback to user
                dispatch(
                  setError(
                    `Your quota is limited. Try again later in ${Math.round(
                      secondsToWait
                    )} seconds.`
                  )
                );
              }
            }
            return;
          }
          dispatch(setError(`Sorry, try again later.`));
        }
      }
      execute();
    },
    emptyEntities: () => {
      dispatch(setUsers([]));
    },
  };
  return actions;
}
export function useUsersGetters() {
  return {
    loading: useSelector((s: IRootState) => s.usersState.loading),
    users: useSelector((s: IRootState) => s.usersState.users),
    error: useSelector((s: IRootState) => s.usersState.error),
  };
}
export interface IUsersStore {
  actions: ReturnType<typeof useUsersActions>;
  getters: ReturnType<typeof useUsersGetters>;
}
