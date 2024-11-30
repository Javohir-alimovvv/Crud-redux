import { api } from './index'

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: `/alimovapi`,
        params, // Bu yerda query parametrlari API ga yuboriladi
      }),
      providesTags: ["Alimovapi"]
    }),
    createAlimovali: build.mutation({
      query: (body) => ({
        url: `/alimovapi`,
        method: 'POST',
        body
      }),
      invalidatesTags: ["Alimovapi"]
    }),
    deletAlimovapi: build.mutation({
      query: (id) => ({
        url: `/alimovapi${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Alimovapi"]
    })
  }),
});

export const { 
  useGetProductsQuery,
  useCreateAlimovaliMutation,
  useDeletAlimovapiMutation
} = productApi;
