import { UserRole } from '@/constants/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * 用来保存账号的登录态
 */
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    token: '',
    role: -1,
    id: -1,
  },
  reducers: {
    loginUser: (state, { payload }: PayloadAction<any>) => {
      state = { ...payload };
    },
    logoutUser: (state) => {
      state = {
        email: '',
        token: '',
        name: '',
        role: -1,
        id: -1,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
