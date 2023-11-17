import { NavLink } from 'react-router-dom'
import { Search, User, Logo } from 'components/index'
import { useAppSelector } from 'redux/store'

import './header.scss'

export default function Header() {

    const { accessToken } = useAppSelector((state) => state.authState)

    return (
        <header className='header'>
            <div className='container header__container'>
                <Logo/>
                {accessToken
                    ? <div className='header__actions'>
                        <Search />
                        <User />
                    </div>
                    : <nav className='header__actions'>
                        <NavLink
                            to='/'
                            className={({ isActive }) => (`btn btn__auth ${isActive ? 'btn__active' : ''}`)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to='/registration'
                            className={({ isActive }) => (`btn btn__auth ${isActive ? 'btn__active' : ''}`)}
                        >
                            Registration
                        </NavLink>
                    </nav>
                }
                
            </div>
        </header>
    )
};
