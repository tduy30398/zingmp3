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
        <div className="w-full flex items-center justify-between">
            <div className="flex w-full items-center">
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
                        <span className="h-10 pl-2 flex items-center justify-center text-text-color-2">
                            <MagnifyingGlassIcon />
                        </span>
                        <input
                            value={searchText}
                            onChange={handleSearchChange}
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

export default Search;
