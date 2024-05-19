import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsersState } from "./IUsersState";
import { IUser } from "@/models/users/IUser";

const initialUsersState: IUsersState = {
  loading: false,
  users: [],
  error: "",
};

export const usersStoreSlice = createSlice({
  name: "usersStoreSlice",
  initialState: initialUsersState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.users = [];
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload || [];
      state.loading = false;
      state.error = "";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.users = [];
    },
  },
});
