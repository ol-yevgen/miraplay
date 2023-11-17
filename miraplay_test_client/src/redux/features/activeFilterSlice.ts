import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IActiveFilterState } from 'types/Types'

const initialState: IActiveFilterState = {
    activeFilter: 'ALL',
    sort: true
}

const activeFilterSlice = createSlice({
    initialState,
    name: 'activeFilterSlice',
    reducers: {
        setActiveFilter: (state, action: PayloadAction<string>) => {
            state.activeFilter = action.payload;
        },
        setSort: (state, ) => {
            state.sort = !state.sort;
        },
    }
});

export default activeFilterSlice.reducer;

export const { setActiveFilter, setSort } = activeFilterSlice.actions;