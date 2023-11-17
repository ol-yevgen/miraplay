import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGamesListTypes, IReqBodyTypes } from 'types/Types'
import { setGamesReq } from 'redux/features/gamesSlice'

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.miraplay.cloud',
    }),
    endpoints: (builder) => ({
        gamesRequest: builder.mutation<IGamesListTypes, IReqBodyTypes>({
            query(data) {
                return {
                    url: '/games/by_page',
                    method: 'POST',
                    body: data,
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setGamesReq(data as IGamesListTypes))
                } catch (err) { }
            }
        }),
    })
})

export const {
    useGamesRequestMutation,
} = gameApi
