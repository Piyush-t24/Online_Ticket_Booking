import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
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
    tagTypes: ['UserData'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => 'user',
            providesTags: ['UserData'],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['UserData'],
        }),
        sendOTP: builder.mutation({
            query: (email) => ({
                url: 'user/generate-otp',
                method: 'POST',
                body: { email },
            }),
        }),
        sendOTPLogin: builder.mutation({
            query: (email) => ({
                url: 'user/generate-otp-login',
                method: 'POST',
                body: { email },
            }),
        }),
        verifyOTP: builder.mutation({
            query: ({ email, otp }) => ({
                url: 'user/verify-otp',
                method: 'POST',
                body: { email, otp },
            }),
            invalidatesTags: ['UserData'],
        }),
        verifyOTPLogin: builder.mutation({
            query: ({ email, otp }) => ({
                url: 'user/verify-otp-login',
                method: 'POST',
                body: { email, otp },
            }),
            invalidatesTags: ['UserData'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'user/logout',
                method: 'GET',
            }),
            invalidatesTags: ['UserData'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useLoginMutation,
    useVerifyOTPMutation,
    useVerifyOTPLoginMutation,
    useSendOTPMutation,
    useSendOTPLoginMutation,
    useLogoutMutation,
} = authApi;