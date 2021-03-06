import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { updateUser } from './userSlice';
import { handleError } from '../../utils/commons';

export interface IUpdatedUser {
  firstName: string;
  lastName: string;
  phone: string;
  showFirstName: boolean;
  showLastName: boolean;
  showPhone: boolean;
}

export const updateUserData = createAsyncThunk<
  string,
  IUpdatedUser,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'user/updateData',
  async (updatedUser, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;
      await axios.put(
        SERVER_ADDR + 'user/me',
        {
          ...updatedUser,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      dispatch(updateUser(updatedUser));
      return 'Success updated';
    } catch (e) {
      return rejectWithValue(handleError(e as Error));
    }
  }
);
