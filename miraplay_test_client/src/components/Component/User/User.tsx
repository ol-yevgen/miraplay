import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import useOutsideClickListener from 'hooks/useOutsideClickListener'
import { useLogoutUserMutation } from 'redux/api/authApi';
import { userIcon, logoutIcon } from 'assets/icons/icons'
import { TUserInfo } from 'types/AuthTypes'
import {useRef } from 'react';
import './user.scss'

export default function User() {
    const userRef = useRef<HTMLUListElement>(null)
    const userInfo = JSON.parse(localStorage.getItem('USER') as string) as TUserInfo
    const { isShow, setIsShow } = useOutsideClickListener(userRef)

    const [logoutUser] = useLogoutUserMutation()
    const navigate: NavigateFunction = useNavigate()

    const logoutHandler = async () => {
        await logoutUser()
        navigate('/')
    }

    return (
        <div className='user__icon'>
            <button
                className='btn btn__user'
                onClick={() => setIsShow(!isShow)}
            >
                {userIcon}
            </button>
            {isShow &&
                <ul
                    className='userMenu'
                    ref={userRef}
                >
                    <li className='userMenu__name'>
                        <div className='userMenu__name-icon'>
                            {userInfo.userName?.charAt(0).toUpperCase()}
                        </div>
                        <span>{userInfo.userName?.split(' ')[0]}</span>
                    </li>
                    <li
                        className='userMenu__item'
                        onClick={() => setIsShow(false)}
                    >
                        <Link to={`/profile/${userInfo.userId}`} className='userMenu__link userMenu__profile'>
                            <div className='userMenu__item-icon'>
                                {userIcon}
                            </div>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li
                        className='userMenu__item'
                        onClick={() => setIsShow(false)}
                    >
                        <button
                            className='userMenu__link userMenu__logout'
                            onClick={logoutHandler}
                            aria-label="User Menu"
                        >
                            <div className='userMenu__item-icon'>
                                {logoutIcon}
                            </div>
                            Logout
                        </button>
                    </li>
                </ul>
            }
        </div>
    )
};