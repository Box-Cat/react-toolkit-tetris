import { configureStore } from "@reduxjs/toolkit";

// redux slice
import gameStatusReducer from "./reducer/gameStatusSlice";

export const store = configureStore({
    reducer: {
        gameStatusReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
    ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;