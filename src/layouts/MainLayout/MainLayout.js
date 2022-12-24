import { useState } from 'react';
import { Sidebar, MusicPlayer, RightSidebarPlaylist, Searchbar } from '../components';

function MainLayout({ children }) {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
    return (
        <div className="w-full relative h-screen flex flex-col bg-primary-color-2">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] h-full flex-none">
                    <Sidebar />
                </div>
                <div className="flex-auto">
                    <div className="h-[70px] px-[59px] flex items-center">
                        <Searchbar />
                    </div>
                    <div>{children}</div>
                </div>
                {isShowRightSidebar && (
                    <div className="w-[330px] flex-none border-l-[1px] border-border-color-1 animate-slide-left">
                        <RightSidebarPlaylist />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[90px] border-t-[1px] border-border-color-1">
                <MusicPlayer
                    setIsShowRightSidebar={setIsShowRightSidebar}
                    isShowRightSidebar={isShowRightSidebar}
                />
            </div>
        </div>
    );
}

export default MainLayout;
