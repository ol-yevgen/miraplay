import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGameTypes, IGamesListTypes } from 'types/Types';

export interface GamesState {
    gamesReq: IGamesListTypes | null
    allGames: IGameTypes[] | null
}

const initialState: GamesState = {
    gamesReq: null,
    allGames: null
}

const gamesSlice = createSlice({
    initialState,
    name: 'modalSlice',
    reducers: {
        setGamesReq: (state, action: PayloadAction<IGamesListTypes>) => {
            state.gamesReq = action.payload
        },
        allGames: (state, action: PayloadAction<IGameTypes[]>) => {
            state.allGames = action.payload
        },
    }
});

export default gamesSlice.reducer;

export const { setGamesReq, allGames } = gamesSlice.actions;
