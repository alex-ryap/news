import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { updateTags } from './userSlice';
import { handleError } from '../../utils/commons';

const errorsMessages = new Map<number, string>();
errorsMessages.set(404, 'User not found');

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
    return rejectWithValue(handleError(e as Error));
  }
});
