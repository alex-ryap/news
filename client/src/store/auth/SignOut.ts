import axios from 'axios';
import { SERVER_ADDR, TOKEN } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { resetAdminSlice } from '../admin/adminSlice';
import { resetAuthSlice } from './authSlice';
import { resetUserSlice } from '../user/userSlice';
import { resetPostsSlice } from '../posts/postsSlice';
import { handleError } from '../../utils/commons';

export const signOut = createAsyncThunk<
  string,
  unknown,
  {
    state: RootState;
    rejectValue: string;
  }
>('auth/signOut', async (_, { rejectWithValue, getState, dispatch }) => {
  try {
    const { token } = getState().auth;
    await axios.post(
      SERVER_ADDR + 'auth/logout',
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    localStorage.removeItem(TOKEN);
    dispatch(resetAuthSlice());
    dispatch(resetUserSlice());
    dispatch(resetPostsSlice());
    dispatch(resetAdminSlice());
    return 'Success logout';
  } catch (e) {
    return rejectWithValue(handleError(e as Error));
  }
});
