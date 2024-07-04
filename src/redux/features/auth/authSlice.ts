import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuthState = {
  user: null | object;
  imgUrl: null | string;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  imgUrl: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, imgUrl } = action.payload;
      // console.log("from state",imgUrl)
      state.user = user;
      state.imgUrl = imgUrl;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.imgUrl = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentImgUrl = (state: RootState) => state.auth.imgUrl;
export const useCurrentUser = (state: RootState) => state.auth.user;
