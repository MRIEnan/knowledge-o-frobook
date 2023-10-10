import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  _id?: string | null;
  id?: string | null;
  email: string | null;
  userName: string | null;
  role: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  needsPasswordChange?: true | false | null;
  passwordChangedAt?: Date | null;
}
const initialState: IUser = {
  _id: null,
  id: null,
  email: null,
  userName: null,
  role: null,
  createdAt: null,
  updatedAt: null,
  needsPasswordChange: null,
  passwordChangedAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    logOutUser: () => {
      return {
        _id: null,
        id: null,
        email: null,
        userName: null,
        role: null,
        createdAt: null,
        updatedAt: null,
        needsPasswordChange: null,
        passwordChangedAt: null,
      };
    },
  },
});

export const { setUserInfo, logOutUser } = userSlice.actions;

export default userSlice.reducer;
