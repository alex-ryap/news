import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  isFullfiledAction,
  isPendingAction,
  isRejectedAction,
} from '../../utils/commons';
import { StatusType, UserRole } from '../../utils/enums';
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
    role: UserRole.READER,
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
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = {
            type: StatusType.SUCCESS,
            message: action.payload,
          };
        }
      )
      .addCase(
        updateUserTags.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = {
            type: StatusType.SUCCESS,
            message: action.payload,
          };
        }
      )
      .addCase(
        getAuthors.fulfilled,
        (state, action: PayloadAction<IAuthor[]>) => {
          state.authors = [...action.payload];
        }
      )
      .addMatcher(isPendingAction, (state, action) => {
        state.isLoading = true;
        state.status = null;
      })
      .addMatcher(isFullfiledAction, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejectedAction, (state, action: AnyAction) => {
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
