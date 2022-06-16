import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  isFullfiledAction,
  isPendingAction,
  isRejectedAction,
} from '../../utils/commons';
import { StatusType } from '../../utils/enums';
import { IPost, IRequestStatus } from '../../utils/interfaces';
import { createPost } from './createPost';
import { deletePost } from './deletePost';
import { getAllPosts } from './getAllPosts';
import { getMyPosts } from './getMyPosts';
import { getPosts, IPostsResponse } from './getPosts';
import { getPostsTags } from './getPostsTags';
import { updatePost } from './updatePost';

interface IPostsState {
  postsList: IPost[];
  totalPosts: number;
  tags: string[];
  isLoading: boolean;
  status: IRequestStatus | null;
}

const initialState: IPostsState = {
  postsList: [],
  totalPosts: 0,
  tags: [],
  isLoading: false,
  status: null,
};

export const postsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
    updateTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    deletePostFromStore: (state, action: PayloadAction<number>) => {
      state.postsList = state.postsList.filter(
        (post) => post.id !== action.payload
      );
    },
    resetPostsSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getPosts.fulfilled,
        (state, action: PayloadAction<IPostsResponse>) => {
          state.postsList = action.payload.list;
          state.totalPosts = action.payload.total;
        }
      )
      .addCase(
        getPostsTags.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.tags = action.payload;
        }
      )
      .addCase(
        getAllPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.postsList = action.payload;
        }
      )
      .addCase(
        getMyPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.postsList = action.payload;
        }
      )
      .addCase(createPost.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addMatcher(isPendingAction, (state) => {
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

export const { clearStatus, deletePostFromStore, updateTags, resetPostsSlice } =
  postsSlice.actions;
export default postsSlice.reducer;
