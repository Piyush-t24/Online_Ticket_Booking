import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
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
    tagTypes: ['TicketOrderDetails'],
    endpoints: (builder) => ({
        getTicketOrderDetails: builder.query({
            query: () => 'orders/myorders',
            providesTags: ['TicketOrderDetails'],
        }),
    }),
});

export const {
    useGetTicketOrderDetailsQuery,
} = dashboardApi;