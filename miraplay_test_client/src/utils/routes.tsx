import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from 'pages/AuthPage/LoginPage'
import GamesLibPage from 'pages/GameLibPage/GamesLibPage'
import { useAppSelector } from 'redux/store'
import { lazy, memo } from 'react'

const RegistrationPage = lazy(() => import('pages/AuthPage/RegistrationPage'))
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'))

export const ProtectedRoutes = memo(() => {
    const { accessToken } = useAppSelector((state) => state.authState)

    if (!!accessToken) {
        return (
            <Routes>
                <Route
                    path='/games_lib'
                    element={<GamesLibPage />}
                />
                <Route
                    path='/profile/:id'
                    element={<ProfilePage />}
                />
                <Route
                    path='*'
                    element={<Navigate to="/games_lib" replace />}
                />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route
                    path='/'
                    element={<LoginPage />}
                />
                <Route
                    path='/registration'
                    element={<RegistrationPage />}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/" />}
                />
            </Routes>
        )
    }
})