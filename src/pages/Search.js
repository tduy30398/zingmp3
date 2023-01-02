import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import paths from '../configs';

const nonActiveStyle =
    'mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2';
const activeStyle =
    'mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2 border-b-[1px] border-[#CA4974]';

function Search({ children }) {
    const { isSearching, searchParams } = useSelector((state) => state.music);

    return (
        <div className="w-full relative flex flex-col mt-[70px] h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {isSearching && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            <div className="border-b-[1px] border-border-color-1 mb-7">
                <div className="w-full flex h-[50px] px-[59px] items-center">
                    <h3 className="hidden lg:block pr-5 text-2xl font-bold border-r-[1px] border-border-color-1">
                        Kết Quả Tìm Kiếm
                    </h3>
                    <div className="flex items-center">
                        <NavLink
                            to={`${paths.SEARCH_ALL}?q=${searchParams}`}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            TẤT CẢ
                        </NavLink>
                        <NavLink
                            to={`${paths.SEARCH_SONGS}?q=${searchParams}`}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            BÀI HÁT
                        </NavLink>
                        <NavLink
                            to={`${paths.SEARCH_PLAYLIST}?q=${searchParams}`}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            PLAYLIST/ALBUM
                        </NavLink>
                        <NavLink
                            to={`${paths.SEARCH_ARTIST}?q=${searchParams}`}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            NGHỆ SĨ/OA
                        </NavLink>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}

export default Search;
