import { configureStore } from '@reduxjs/toolkit';
import { museumApi } from '../features/museum/museumApi';
import MuseumReducer from '../features/museum/museumSlice';
import { authApi } from '../features/auth/authApi';
import { dashboardApi } from '../features/dashboard/dashboardApi';
import { homeApi } from '../features/home/homeApi';

export default configureStore({
    reducer: {
        [museumApi.reducerPath]: museumApi.reducer,
        museum: MuseumReducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [homeApi.reducerPath]: homeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(museumApi.middleware, authApi.middleware, dashboardApi.middleware, homeApi.middleware),
});