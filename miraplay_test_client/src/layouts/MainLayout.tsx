import { ProtectedRoutes } from "utils/routes"
import { Header, Footer, Spinner } from "components";
import { FC, memo, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import { useRefreshLoginQuery, useLogoutUserMutation } from "redux/api/authApi";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";

import './mainLayout.scss'

export const MainLayout: FC = () => {
    const { isLoading, isError, isSuccess} = useRefreshLoginQuery()
    const [logoutUser] = useLogoutUserMutation()

    const navigate: NavigateFunction = useNavigate()
    const location: Location = useLocation()

    useEffect(() => {
        if (isSuccess) {
            const interval = setTimeout(() => {

                navigate(`${location.pathname}`, { replace: false })
            }, 0)

            return () => clearTimeout(interval)

        }
        if (isError) {
            logoutUser()
            navigate('/')
        }
    }, [isSuccess, isError])

    if (isLoading) return <Spinner size='100px' color="#3f9c14" bg='spinner' />

    return (
        <>
            <Header />

            <main className="main  ">
                <div className="hero__bg"><div></div></div>
                <ProtectedRoutes />
            </main>

            <Footer />

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>


    )
}
