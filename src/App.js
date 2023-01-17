/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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
    setTop100,
    setScreenWidthRedux
} from './redux/actions';
import { EmptyComponent } from './pages';
import { getTop100API } from './APIs';

function App() {
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Call API
    useEffect(() => {
        dispatch(getHome());
        dispatch(getChartPage());
        dispatch(getNewRelease());
        const fetchTop100API = async () => {
            const response = await getTop100API();
            dispatch(setTop100(response.data.data));
        };
        fetchTop100API();
    }, []);

    useEffect(() => {
        const detectKeyDown = (e) => {
            if (e.keyCode === 32 && e.target === document.body) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', detectKeyDown);
    }, []);

    const setWidth = (e) => {
        setScreenWidth(e.target.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', setWidth);

        return () => {
            window.removeEventListener('resize', setWidth);
        };
    }, []);

    useEffect(() => {
        dispatch(setScreenWidthRedux(screenWidth));
    }, [screenWidth]);

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
