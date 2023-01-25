/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    BsArrowLeft,
    BsArrowRight,
    TfiSettings,
    RiVipDiamondLine
} from '../../assets/icons/staticIcons';
import { MagnifyingGlassIcon, ClearIcon } from '../../assets/images/svgIcons';
import { setIsTyping, setSearchText } from '../../redux/actions';
import paths from '../../configs';

function Searchbar() {
    const { searchText } = useSelector((state) => state.music);
    const { screenWidthRedux } = useSelector((state) => state.app);
    const inputRef = useRef('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        dispatch(setSearchText(e.target.value));
    };

    const handleClearSearch = () => {
        dispatch(setSearchText(''));
        inputRef.current.focus();
    };

    const handleNavigate = () => {
        navigate({
            pathname: paths.SEARCH_ALL,
            search: createSearchParams({
                q: searchText
            }).toString()
        });
    };

    // Handle search when press enter
    const handleSearchEnter = (e) => {
        if (e.keyCode === 13) {
            handleNavigate();
        }
    };

    return (
        <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
                <div className="flex">
                    <span
                        onClick={() => navigate(-1)}
                        className="text-text-color-1 mr-5 cursor-pointer"
                    >
                        <BsArrowLeft size={24} />
                    </span>
                    <span
                        onClick={() => navigate(1)}
                        className="text-text-color-1 mr-5 cursor-pointer"
                    >
                        <BsArrowRight size={24} />
                    </span>
                </div>
                <div className="w-1/2">
                    <div className="w-full flex items-center text-sm text-text-color-2 bg-primary-color-5 rounded-[20px]">
                        <span
                            onClick={handleNavigate}
                            className="h-10 pl-2 flex items-center justify-center cursor-pointer text-text-color-2 hover:text-text-color-1"
                        >
                            <MagnifyingGlassIcon />
                        </span>
                        <input
                            value={searchText}
                            onChange={handleInputChange}
                            onKeyUp={handleSearchEnter}
                            onFocus={() => dispatch(setIsTyping(true))}
                            onBlur={() => dispatch(setIsTyping(false))}
                            ref={inputRef}
                            className="outline-none px-1 bg-primary-color-5 py-2 w-full caret-white h-10 placeholder-[#dbd0d9] rounded-r-[20px]"
                            placeholder={
                                screenWidthRedux > 800
                                    ? `Tìm kiếm bài hát, nghệ sĩ, lời bài hát...`
                                    : 'Tìm kiếm...'
                            }
                        />
                        {!!searchText && (
                            <button onClick={handleClearSearch} className="mr-4 mb-1">
                                <ClearIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                {screenWidthRedux > 480 && (
                    <button className="w-[38px] h-[38px] bg-primary-color-5 rounded-full hover:opacity-80 mr-3">
                        <a
                            title="Nâng cấp VIP"
                            href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=icon-header"
                            target="_blank"
                            rel="noreferrer"
                            className="text-text-color-2 flex items-center justify-center"
                        >
                            <RiVipDiamondLine size={20} />
                        </a>
                    </button>
                )}
                {screenWidthRedux > 480 && (
                    <button className="w-[38px] h-[38px] bg-primary-color-5 rounded-full hover:opacity-80 mr-3">
                        <span
                            onClick={() => toast.warn('Tính năng đang được phát triển...')}
                            title="Cài đặt"
                            className="text-text-color-2 flex items-center justify-center"
                        >
                            <TfiSettings size={20} />
                        </span>
                    </button>
                )}
                <button
                    onClick={() => toast.warn('Tính năng đang được phát triển...')}
                    className="w-[38px] h-[38px] hover:opacity-80"
                >
                    <img
                        className="rounded-full"
                        src="https://avatar.talk.zdn.vn/default.jpg"
                        alt="logo"
                    />
                </button>
            </div>
        </div>
    );
}

export default Searchbar;
