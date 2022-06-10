import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';
import { updateUserRoleFromStore } from './adminSlice';

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
      return rejectWithValue((e as IError).message);
    }
  }
);
