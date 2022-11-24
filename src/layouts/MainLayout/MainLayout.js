import { Sidebar } from '../components';

function MainLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div>{children}</div>
        </div>
    );
}

export default MainLayout;
