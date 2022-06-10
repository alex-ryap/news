import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';
import { updateTags } from './userSlice';

export const updateUserTags = createAsyncThunk<
  string,
  string[],
  {
    state: RootState;
    rejectValue: string;
  }
>('user/updateTags', async (tags, { rejectWithValue, getState, dispatch }) => {
  try {
    const { token } = getState().auth;
    await axios.put(SERVER_ADDR + 'user/me/tags', [...tags], {
      headers: {
        token: token,
      },
    });
    dispatch(updateTags(tags));
    return 'Subscribes updated';
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
