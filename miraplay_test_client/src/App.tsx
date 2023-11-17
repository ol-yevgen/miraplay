import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from "layouts/MainLayout";
import { store } from "redux/store";
import { Suspense } from "react";
import { Spinner } from "components";

export default function App() {
    return (
        <Provider store={store}>
            <Suspense fallback={<Spinner bg='spinner' size='100px' color="#3f9c14"/>}>
                <Router>
                    <MainLayout />
                </Router>
            </Suspense>
            
        </Provider>
    )
}
