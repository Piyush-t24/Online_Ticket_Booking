import { configureStore } from '@reduxjs/toolkit';
import { authorApi } from '../features/authorApi';

export default configureStore({
    reducer: {
        [authorApi.reducerPath]: authorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authorApi.middleware),
});