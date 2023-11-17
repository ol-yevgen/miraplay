import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import activeFilterSlice from './features/activeFilterSlice'
import { configureStore } from '@reduxjs/toolkit'
import gamesSlice from './features/gamesSlice'
import modalSlice from './features/modalSlice'
import { profileApi } from './api/profileApi'
import authSlice from './features/authSlice'
import { gameApi } from './api/gamesApi'
import { authApi } from './api/authApi'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,
        authState: authSlice,
        gamesState: gamesSlice,
        activeFilterState: activeFilterSlice,
        modalState: modalSlice,
    },
    devTools: process.env.REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([
        authApi.middleware,
        gameApi.middleware,
        profileApi.middleware,
    ]),
})

export type TRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector