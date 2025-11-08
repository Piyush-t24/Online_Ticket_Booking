import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authorApi = createApi({
    reducerPath: 'authorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_HOST}/`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['AllSlots', 'AuthorDetails'],
    endpoints: (builder) => ({
        getAllSlots: builder.query({
            query: () => 'author/get-all-slots',
            providesTags: ['AllSlots'],
        }),
        getAuthorDetails: builder.query({
            query: () => 'author/dashboard',
            providesTags: ['AuthorDetails'],
        }),
        addSlot: builder.mutation({
            query: (newSlot) => ({
                url: 'author/add-slot',
                method: 'POST',
                body: newSlot,
            }),
            invalidatesTags: ['AllSlots'],
        }),
        loginAuthor: builder.mutation({
            query: (credentials) => ({
                url: 'author/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['AuthorDetails'],
        }),
        logoutAuthor: builder.mutation({
            query: () => ({
                url: 'author/logout',
                method: 'GET',
            }),
            invalidatesTags: ['AuthorDetails'],
        }),
    }),
});

export const {
    useGetAllSlotsQuery,
    useGetAuthorDetailsQuery,
    useAddSlotMutation,
    useLoginAuthorMutation,
    useLogoutAuthorMutation,
} = authorApi;