import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { deleteUserFromStore } from './adminSlice';
import { handleError } from '../../utils/commons';

export const deleteUser = createAsyncThunk<
  string,
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>('admin/deleteUser', async (id, { rejectWithValue, getState, dispatch }) => {
  try {
    const { token } = getState().auth;
    await axios.delete(SERVER_ADDR + `admin/user/${id}`, {
      headers: {
        token: token,
      },
    });
    dispatch(deleteUserFromStore(id));
    return 'User deleted';
  } catch (e) {
    return rejectWithValue(handleError(e as Error));
  }
});
