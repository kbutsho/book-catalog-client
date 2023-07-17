import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import { api } from './api/apiSlice';
import wishListReducer from './features/wishList/wishListSlice';
import readingListReducer from './features/readingList/readingListSLice';

const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    readingList: readingListReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
