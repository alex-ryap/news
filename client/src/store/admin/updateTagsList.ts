import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { updateTags } from '../posts/postsSlice';
import { handleError } from '../../utils/commons';

export const updateTagsList = createAsyncThunk<
  string,
  string[],
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'admin/upateTagsList',
  async (tags, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;
      await axios.put(SERVER_ADDR + `admin/news/tags`, [...tags], {
        headers: {
          token: token,
        },
      });
      dispatch(updateTags(tags));
      return 'Tags updated';
    } catch (e) {
      return rejectWithValue(handleError(e as Error));
    }
  }
);
