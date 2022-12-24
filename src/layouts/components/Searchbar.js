/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';

import {
    BsArrowLeft,
    BsArrowRight,
    TfiSettings,
    HiOutlineUpload,
    RiVipDiamondLine,
} from '../../assets/icons/staticIcons';
import { MagnifyingGlassIcon, ClearIcon } from '../../assets/images/svgIcons';
import { setIsTyping, setSearchResult, setIsSearching } from '../../redux/actions';
import routes from '../../configs';
import { searchAPI } from '../../APIs';

function Searchbar() {
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
        inputRef.current.focus();
    };

    const getSearchAPI = async () => {
        dispatch(setIsSearching(true));
        const respone = await searchAPI(searchText);
        dispatch(setIsSearching(false));
        if (respone?.data.err === 0) {
            dispatch(setSearchResult(respone.data.data));
        }
    };

    const handleSearchKeyword = async () => {
        getSearchAPI();
        navigate({
            pathname: routes.search_all,
            search: createSearchParams({
                q: searchText,
            }).toString(),
        });
    };

    // Handle search when press enter
    const handleSearchEnter = (e) => {
        if (e.keyCode === 13) {
            handleSearchKeyword();
        }
    };

    return (
        <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
                <div className="flex">
                    <span className="text-[#6E4D65] mr-[20px]">
                        <BsArrowLeft size={24} />
                    </span>
                    <span className="text-[#6E4D65] mr-[20px]">
                        <BsArrowRight size={24} />
                    </span>
                </div>
                <div className="w-1/2">
                    <div className="w-full flex items-center text-sm text-text-color-2 bg-primary-color-5 rounded-[20px]">
                        <span
                            onClick={handleSearchKeyword}
                            className="h-10 pl-2 flex items-center justify-center cursor-pointer text-text-color-2 hover:text-text-color-1"
                        >
                            <MagnifyingGlassIcon />
                        </span>
                        <input
                            value={searchText}
                            onChange={handleSearchChange}
                            onKeyUp={handleSearchEnter}
                            onFocus={() => dispatch(setIsTyping(true))}
                            onBlur={() => dispatch(setIsTyping(false))}
                            ref={inputRef}
                            className="outline-none px-1 bg-primary-color-5 py-2 w-full caret-white h-10 placeholder-[#dbd0d9] rounded-r-[20px]"
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
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
                <button className="w-[38px] h-[38px] bg-primary-color-5 rounded-full hover:opacity-80 mr-3">
                    <span
                        title="Tải lên"
                        className="text-text-color-2 flex items-center justify-center"
                    >
                        <HiOutlineUpload size={20} />
                    </span>
                </button>
                <button className="w-[38px] h-[38px] bg-primary-color-5 rounded-full hover:opacity-80 mr-3">
                    <span
                        title="Cài đặt"
                        className="text-text-color-2 flex items-center justify-center"
                    >
                        <TfiSettings size={20} />
                    </span>
                </button>
                <button className="w-[38px] h-[38px] hover:opacity-80">
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
