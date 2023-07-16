import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string | null;
  userId: string | null;
}

const initialState: IUser = {
  email: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    removeLoginUser: (state) => {
      state.email = '';
      state.userId = '';
    },
  },
});

export const { setLoginUser, removeLoginUser } = userSlice.actions;
export default userSlice.reducer;