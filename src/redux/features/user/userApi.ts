import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user'],
    }),
    signup: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation
} = userApi;
