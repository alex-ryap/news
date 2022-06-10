import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IUser } from '../../utils/interfaces';
import { RootState } from '../store';

export const getUserData = createAsyncThunk<
  IUser,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>('user/getData', async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(SERVER_ADDR + 'user/me', {
      headers: {
        token: token,
      },
    });
    return response.data?.me;
  } catch (e) {
    return rejectWithValue("Can't load user data");
  }
});
