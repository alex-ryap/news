import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOKEN } from '../../utils/constants';
import { StatusType } from '../../utils/enums';
import { IRequestStatus } from '../../utils/interfaces';
import { signIn } from './SignIn';
import { signOut } from './SignOut';
import { signUp } from './SignUp';

export interface IUserData {
  login: string;
  password: string;
}

interface IAuthState {
  token: string;
  isAuthed: boolean;
  isLoading: boolean;
  status: IRequestStatus | null;
}

const initialState: IAuthState = {
  token: localStorage.getItem(TOKEN) || '',
  isAuthed: localStorage.getItem(TOKEN) ? true : false,
  isLoading: false,
  status: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
    resetAuthSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuthed = true;
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(signOut.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuthed = false;
        state.status = {
          type: StatusType.SUCCESS,
          message: action.payload,
        };
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.status = {
          type: StatusType.ERROR,
          message: action.payload || '',
        };
      });
  },
});

export const { clearStatus, resetAuthSlice } = authSlice.actions;
export default authSlice.reducer;
