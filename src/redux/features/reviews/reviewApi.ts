import { api } from "../../api/apiSlice";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (id) => `/review/${id}`
    }),
    addReview: builder.mutation({
      query: ({ data }) => ({
        url: `/review`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['reviews']
    })
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewsQuery
} = reviewApi;