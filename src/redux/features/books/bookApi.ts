import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['books'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  usePostReviewMutation,
  useSingleBookQuery,
} = bookApi;