/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import MainLayout from './layouts/MainLayout/MainLayout';
import { publicRoutes } from './routes';
import { getHome } from './redux/actions';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHome());
    }, []);
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <MainLayout>
                                    <Page />
                                </MainLayout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
