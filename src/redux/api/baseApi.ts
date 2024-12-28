import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import { toast } from 'sonner';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',

  credentials: 'include', // It'll send cookies with every request

  // This function will run before every request and add the token to the headers
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `${token}`);
    }
    return headers;
  },
});

// Custom baseQuery (which will extend the baseQuery) function to handle 401 error, if the token is expired then it'll send a request for a new access token by sending the refresh token
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.message);
  }

  if (result?.error?.status === 403) {
    toast.error(result?.error?.data?.message);
  }

  if (result?.error?.status === 401) {
    // Send Refresh Token
    const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      // again we have to run the baseQuery to get the updated data
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['semester', 'courses'],
  endpoints: () => ({}),
});
