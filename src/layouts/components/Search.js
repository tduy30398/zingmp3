import { useRef, useState } from 'react';

import {
    BsArrowLeft,
    BsArrowRight,
    TfiSettings,
    HiOutlineUpload,
    RiVipDiamondLine,
} from '../../assets/icons';
import { MagnifyingGlassIcon, ClearIcon } from '../../assets/images/svgIcons';

function Search() {
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
        inputRef.current.focus();
    };

    return (
        <div className="fixed h-[70px] w-[calc(100%-570px)] px-[59px] flex items-center justify-between">
            <div className="flex items-center">
                <span className="text-[#6E4D65] mr-[20px]">
                    <BsArrowLeft size={24} />
                </span>
                <span className="text-[#6E4D65] mr-[20px]">
                    <BsArrowRight size={24} />
                </span>
                <div className="flex items-center w-[440px] bg-[#5D3953] rounded-[20px] text-sm">
                    <span className="text-text-color-2 ml-2 mr-1 cursor-pointer">
                        <MagnifyingGlassIcon />
                    </span>
                    <input
                        value={searchText}
                        onChange={handleSearchChange}
                        ref={inputRef}
                        className="outline-none h-10 bg-transparent caret-white w-10/12 py-[5px] text-[#ebe6e9] placeholder-[#b8b0b5]"
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    />
                    {!!searchText && (
                        <button onClick={handleClearSearch} className="mr-4 mb-1">
                            <ClearIcon />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center">
                <button className="w-[38px] h-[38px] bg-[#542E4A] rounded-[50%] hover:opacity-80 mr-3">
                    <a
                        href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=icon-header"
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-color-2 flex items-center justify-center"
                    >
                        <RiVipDiamondLine size={20} />
                    </a>
                </button>
                <button className="w-[38px] h-[38px] bg-[#542E4A] rounded-[50%] hover:opacity-80 mr-3">
                    <span className="text-text-color-2 flex items-center justify-center">
                        <HiOutlineUpload size={20} />
                    </span>
                </button>
                <button className="w-[38px] h-[38px] bg-[#542E4A] rounded-[50%] hover:opacity-80 mr-3">
                    <span className="text-text-color-2 flex items-center justify-center">
                        <TfiSettings size={20} />
                    </span>
                </button>
                <button className="w-[38px] h-[38px] hover:opacity-80">
                    <img
                        className="rounded-[50%]"
                        src="https://avatar.talk.zdn.vn/default.jpg"
                        alt="logo"
                    />
                </button>
            </div>
        </div>
    );
}

export default Search;
