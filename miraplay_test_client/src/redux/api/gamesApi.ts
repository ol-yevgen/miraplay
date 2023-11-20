import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGameTypes, IGamesListTypes, IReqBodyTypes } from 'types/Types'
import { setGamesReq, allGames } from 'redux/features/gamesSlice'

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.miraplay.cloud',
    }),
    endpoints: (builder) => ({

        allGamesRequest: builder.query < IGameTypes[], {}>({
            query() {
                return {
                    url: '/games',
                    method: 'GET',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(allGames(data as IGameTypes[]))
                } catch (err) { }
            }
        }),
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
    useLazyAllGamesRequestQuery,
} = gameApi
