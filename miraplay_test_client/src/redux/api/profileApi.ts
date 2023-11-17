import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccess } from 'redux/features/authSlice';
import { IAccessToken, ICreateNickname, ICreateNicknameRes, ILoginRes, ILogoutRes, IUpdateEmailReq, TUserInfo } from 'types/AuthTypes';
import { IProfileInfoReq } from 'types/Types';
import { successToast, errorToast } from 'utils/toast';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const userStorage = process.env.REACT_APP_LOCAL_USER as string

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
    }),
    tagTypes: ['User', ],
    endpoints: (builder) => ({
        getUserInfo: builder.query<ILoginRes, IProfileInfoReq>({
            query: ({ id, accessToken }) => ({
                url: `user/${id}`,
                credentials: 'include',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }),
            providesTags: ['User'],
            transformResponse: (result: ILoginRes) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken !== undefined) {
                        dispatch(setAccess(data.accessToken as IAccessToken));
                    }
                } catch (err) { }
            }
        }),
        createNickName: builder.mutation<ICreateNicknameRes, ICreateNickname>({
            query({ nickName, id, accessToken }) {
                return {
                    url: `user/${id}`,
                    credentials: 'include',
                    mode: 'cors',
                    method: 'PUT',
                    body: nickName,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            },
            invalidatesTags: ['User'],
            transformResponse: (result: ICreateNicknameRes) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken !== undefined) {
                        dispatch(setAccess(data.accessToken as IAccessToken));
                    }
                    const userInfo = JSON.parse(localStorage.getItem(userStorage) as string) as TUserInfo
                    const newUserInfo = { ...userInfo, nickName: data?.nickName }
                    localStorage.setItem(userStorage, JSON.stringify(newUserInfo))
                } catch (err) { }
            }
        }),
        updateEmails: builder.mutation<ILogoutRes, IUpdateEmailReq>({
            query({ updateEmail, accessToken }) {
                console.log(updateEmail)
                return {
                    url: `user`,
                    credentials: 'include',
                    mode: 'cors',
                    method: 'PUT',
                    body: updateEmail,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            },
            invalidatesTags: ['User'],
            transformResponse: (result: ILogoutRes) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken !== undefined) {
                        dispatch(setAccess(data.accessToken as IAccessToken));
                    }
                } catch (err) { }
            }
        }),
    })
});

export const {
    useGetUserInfoQuery,
    useCreateNickNameMutation,
    useUpdateEmailsMutation,
} = profileApi;
