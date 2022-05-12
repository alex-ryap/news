import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthData, IToken } from '../../utils/interfaces';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/auth',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: 'signup',
          method: 'PUT',
          body,
        };
      },
    }),
    loginUser: builder.mutation<IToken, IAuthData>({
      query: (body) => {
        return {
          url: 'login',
          method: 'POST',
          body,
        };
      },
    }),
    logout: builder.mutation({
      query: (token: string) => {
        return {
          url: 'logout',
          method: 'POST',
          headers: {
            token,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutMutation,
} = authApi;
