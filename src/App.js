/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout/MainLayout';
import { publicRoutes } from './routes';
import {
    getHome,
    getChartPage,
    getNewRelease,
    getTop100,
    setScreenWidthRedux
} from './redux/actions';
import { EmptyComponent } from './pages';

function App() {
    const dispatch = useDispatch();

    // Call API
    useEffect(() => {
        dispatch(getHome());
        dispatch(getTop100());
        dispatch(getChartPage());
        dispatch(getNewRelease());
    }, []);

    useEffect(() => {
        const detectKeyDown = (e) => {
            if (e.keyCode === 32) {
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', detectKeyDown);

        return () => {
            window.removeEventListener('keydown', detectKeyDown);
        };
    }, []);

    const setWidth = (e) => {
        dispatch(setScreenWidthRedux(e.target.innerWidth));
    };

    useEffect(() => {
        window.addEventListener('resize', setWidth);

        return () => {
            window.removeEventListener('resize', setWidth);
        };
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    {publicRoutes.map((route) => {
                        const Page = route.component || EmptyComponent;
                        const SubPage = route.subComponent || EmptyComponent;

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <MainLayout>
                                        <Page>
                                            <SubPage />
                                        </Page>
                                    </MainLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
