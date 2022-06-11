import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState, StatusType } from '../../utils/enums';
import { IRequestStatus } from '../../utils/interfaces';
import { deletePost } from './deletePost';
import { deleteUser } from './deleteUser';
import { getUserPosts } from './getUserPosts';
import { getUsers } from './getUsers';
import { updatePost } from './updatePost';
import { updateTagsList } from './updateTagsList';
import { updateUserRole } from './updateUserRole';

export interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  tags: string[];
  showFirstName: boolean;
  showLastName: boolean;
  showPhone: boolean;
  role: string;
  login: string;
}

export interface IUserPost {
  id: number;
  header: string;
  description: string;
  tags: string[];
  state: PostState;
  publicationDate: string;
}

interface IAdminState {
  users: IUserData[];
  userPosts: IUserPost[];
  isLoading: boolean;
  status: IRequestStatus | null;
}

const initialState: IAdminState = {
  users: [],
  userPosts: [],
  isLoading: false,
  status: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
    updateUserRoleFromStore: (
      state,
      action: PayloadAction<{ id: number; role: string }>
    ) => {
      state.users = [
        ...state.users.map((user) => {
          if (user.id === action.payload.id) {
            user.role = action.payload.role;
          }
          return user;
        }),
      ];
    },
    deleteUserFromStore: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    resetAdminSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<IUserData[]>) => {
          state.isLoading = false;
          state.users = action.payload;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        getUserPosts.fulfilled,
        (state, action: PayloadAction<IUserPost[]>) => {
          state.isLoading = false;
          state.userPosts = action.payload;
        }
      )
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(updateTagsList.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        updateTagsList.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.status = {
            type: StatusType.SUCCESS,
            message: action.payload,
          };
        }
      )
      .addCase(updateTagsList.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.status = {
            type: StatusType.SUCCESS,
            message: action.payload,
          };
        }
      )
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      });
  },
});

export const {
  resetAdminSlice,
  updateUserRoleFromStore,
  deleteUserFromStore,
  clearStatus,
} = adminSlice.actions;
export default adminSlice.reducer;
