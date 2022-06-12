import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { updateUserRoleFromStore } from './adminSlice';
import { handleError } from '../../utils/commons';

const errorsMessages = new Map<number, string>();
errorsMessages.set(400, 'ID or role not defined');
errorsMessages.set(404, 'User not found');

export const updateUserRole = createAsyncThunk<
  string,
  {
    id: number;
    role: string;
  },
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'admin/updateUserRole',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;
      const { id, role } = params;
      const response = await axios.put(
        SERVER_ADDR + `admin/user/${id}`,
        {
          role: role,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      dispatch(updateUserRoleFromStore({ id, role }));
      return response.data;
    } catch (e) {
      return rejectWithValue(handleError(e as Error, errorsMessages));
    }
  }
);
