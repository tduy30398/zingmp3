import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Sidebar, MusicPlayer, RightSidebarPlaylist, Searchbar } from '../components';

function MainLayout({ children }) {
    const { screenWidthRedux } = useSelector((state) => state.app);
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);

    return (
        <div className="w-full relative h-screen flex flex-col bg-primary-color-2">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[70px] lg:w-[240px] h-full flex-none">
                    <Sidebar />
                </div>
                <div className="flex-auto">
                    <div
                        className={`h-[70px] ${
                            screenWidthRedux > 1022 ? 'px-[59px]' : 'px-[29px]'
                        } flex items-center fixed top-0 left-0 right-0 ml-[70px] lg:ml-[240px] z-50 ${
                            isShowRightSidebar ? '2xl:mr-[330px]' : ''
                        }`}
                    >
                        <Searchbar />
                    </div>
                    <div>{children}</div>
                </div>
                {isShowRightSidebar && (
                    <div className="w-[330px] z-[60] flex-none border-l-[1px] border-border-color-1 animate-slide-left">
                        <RightSidebarPlaylist />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[90px] border-t-[1px] border-border-color-1 z-[70]">
                <MusicPlayer
                    setIsShowRightSidebar={setIsShowRightSidebar}
                    isShowRightSidebar={isShowRightSidebar}
                />
            </div>
        </div>
    );
}

export default MainLayout;
