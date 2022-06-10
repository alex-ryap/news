import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../../utils/enums';
import { IPost, IRequestStatus } from '../../utils/interfaces';
import { createPost } from './createPost';
import { deletePost } from './deletePost';
import { getAllPosts } from './getAllPosts';
import { getMyPosts } from './getMyPosts';
import { getPosts } from './getPosts';
import { getPostsTags } from './getPostsTags';
import { updatePost } from './updatePost';

interface IPostsState {
  postsList: IPost[];
  tags: string[];
  isLoading: boolean;
  status: IRequestStatus | null;
}

const initialState: IPostsState = {
  postsList: [],
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
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        state.postsList = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(getPostsTags.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        getPostsTags.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.isLoading = false;
          state.tags = action.payload;
        }
      )
      .addCase(getPostsTags.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        getAllPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.isLoading = false;
          state.postsList = action.payload;
        }
      )
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(getMyPosts.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(
        getMyPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.isLoading = false;
          state.postsList = action.payload;
        }
      )
      .addCase(getMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(createPost.rejected, (state, action) => {
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
      });
  },
});

export const { clearStatus, deletePostFromStore, updateTags, resetPostsSlice } =
  postsSlice.actions;
export default postsSlice.reducer;
