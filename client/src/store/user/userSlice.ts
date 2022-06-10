import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../../utils/enums';
import { IRequestStatus, IUser } from '../../utils/interfaces';
import { getAuthors } from './getAuthors';
import { getUserData } from './getUserData';
import { IUpdatedUser, updateUserData } from './updateUserData';
import { updateUserTags } from './updateUserTags';

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
}

interface IUserState {
  user: IUser;
  authors: IAuthor[];
  isLoading: boolean;
  status: IRequestStatus | null;
}

const initialState: IUserState = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    tags: [],
    showFirstName: true,
    showLastName: true,
    showPhone: true,
    role: '',
  },
  authors: [],
  isLoading: false,
  status: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
    updateUser: (state, action: PayloadAction<IUpdatedUser>) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateTags: (state, action: PayloadAction<string[]>) => {
      state.user.tags = action.payload;
    },
    resetUserSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.status = {
            type: StatusType.SUCCESS,
            message: action.payload,
          };
        }
      )
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(updateUserTags.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        updateUserTags.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.status = {
            type: StatusType.SUCCESS,
            message: action.payload,
          };
        }
      )
      .addCase(updateUserTags.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(getAuthors.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        getAuthors.fulfilled,
        (state, action: PayloadAction<IAuthor[]>) => {
          state.isLoading = false;
          state.authors = [...action.payload];
        }
      )
      .addCase(getAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      });
  },
});

export const { clearStatus, updateUser, updateTags, resetUserSlice } =
  userSlice.actions;
export default userSlice.reducer;
