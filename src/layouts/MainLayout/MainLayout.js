import { Sidebar, MusicPlayer, Playlist, Search } from '../components';

function MainLayout({ children }) {
    return (
        <div className="w-full relative h-screen flex flex-col bg-primary-color-2">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] h-full flex-none">
                    <Sidebar />
                </div>
                <div className="flex-auto">
                    <div className="h-[70px] px-[59px] flex items-center">
                        <Search />
                    </div>
                    <div>{children}</div>
                </div>
                <div className="w-[330px] hidden 2xl:flex animate-slide-left flex-none border-l-[1px] border-border-color-1">
                    <Playlist />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[90px] border-t-[1px] border-border-color-1">
                <MusicPlayer />
            </div>
        </div>
    );
}

export default MainLayout;
