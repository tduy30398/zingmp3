/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout/MainLayout';
import { publicRoutes } from './routes';
import { getHome, getChartPage, getNewRelease, setTop100 } from './redux/actions';
import { EmptyComponent } from './pages';
import { getTop100API } from './APIs';

function App() {
    const dispatch = useDispatch();

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
