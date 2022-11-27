import { Sidebar, MusicPlayer, Playlist } from '../components';

function MainLayout({ children }) {
    return (
        <>
            <Sidebar />
            <div>{children}</div>
            <MusicPlayer />
            <Playlist />
        </>
    );
}

export default MainLayout;
