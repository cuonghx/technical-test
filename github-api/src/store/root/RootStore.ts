import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { IUsersStore } from "../users";
import { usersStoreSlice, useUsersActions, useUsersGetters } from "../users";

export const rootStore = configureStore({
  reducer: {
    usersState: usersStoreSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof rootStore.dispatch>();

export type IRootState = ReturnType<typeof rootStore.getState>;

interface IRootStore {
  usersStore: IUsersStore;
}

export function useAppStore(): IRootStore {
  const dispatch = useDispatch();
  return {
    usersStore: {
      actions: useUsersActions(dispatch),
      getters: useUsersGetters(),
    },
  };
}

export function getAppState(): IRootState {
  const appState = rootStore.getState();
  return {
    ...appState,
  };
}
