import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
    reducerPath: 'homeApi',
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
    tagTypes: ['MuseumEntries'],
    endpoints: (builder) => ({
        getMuseumEntries: builder.query({
            query: (inputValue) => `venue/get-entries?name=${inputValue}`,
            providesTags: ['MuseumEntries'],
        }),
    }),
});

export const {
    useGetMuseumEntriesQuery
} = homeApi;