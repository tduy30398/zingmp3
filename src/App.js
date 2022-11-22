import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
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
