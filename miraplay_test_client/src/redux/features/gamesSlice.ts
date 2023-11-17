import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGameTypes, IGamesListTypes } from 'types/Types';

export interface GamesState {
    gamesReq: IGamesListTypes | null
}

const initialState: GamesState = {
    gamesReq: null
}

const gamesSlice = createSlice({
    initialState,
    name: 'modalSlice',
    reducers: {
        setGamesReq: (state, action: PayloadAction<IGamesListTypes>) => {
            state.gamesReq = action.payload
        },
    }
});

export default gamesSlice.reducer;

export const { setGamesReq } = gamesSlice.actions;
