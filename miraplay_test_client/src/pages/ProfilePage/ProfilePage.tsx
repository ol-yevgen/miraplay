import { CreateNickName, UpdateEmail } from 'components/index'
import './profilePage.scss'
import { useGetUserInfoQuery } from 'redux/api/profileApi'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/store'
import { memo } from 'react'

function ProfilePage() {

    const userId = useParams().id as string
    const { accessToken } = useAppSelector((state) => state.authState)

    const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery({ id: userId, accessToken })
    // const userInfo = JSON.parse(localStorage.getItem('USER') as string) as TUserInfo

    return (
        <section className='profile'>
            <div className='profile__left'>
                <h1 className='profile__title'>PERSONAL INFORMATION</h1>
                <div className='profile__left-item '>
                    <span>Name:</span>
                    <h2 className='profile__title'>{data?.userInfo?.fullName}</h2>
                </div>
                <div className='profile__left-item '>
                    <span>Email:</span>
                    <h2 className='profile__title'>{data?.userInfo?.email}</h2>
                </div>
                <div className='profile__left-item '>
                    <span>NickName:</span>
                    <h2 className='profile__title'>{data?.userInfo?.nickName}</h2>
                </div>
            </div>

            <div className='profile__right'>
                <CreateNickName />
                <UpdateEmail
                    currEmail={data?.userInfo?.email as string}
                />
            </div>
        </section>
    )
};

export default memo(ProfilePage)