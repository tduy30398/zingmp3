/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { BsChevronRight } from '../assets/icons';
import { SongItem } from '../components';

function NewRelease() {
    const { newRelease } = useSelector((state) => state.app);

    const [songType, setSongType] = useState(0);
    const [songContent, setSongContent] = useState([]);

    useEffect(() => {
        if (songType === 0) {
            setSongContent(newRelease?.items?.all);
        } else if (songType === 1) {
            setSongContent(newRelease?.items?.vPop);
        } else if (songType === 2) {
            setSongContent(newRelease?.items?.others);
        }
    }, [songType, newRelease]);

    return (
        <div className="w-full overflow-hidden px-[59px] mt-12 flex flex-col">
            <h3 className="text-text-color-2 mb-5 text-left font-bold text-xl capitalize">
                {newRelease?.title}
            </h3>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            setSongType(0);
                        }}
                        className={`py-1 px-6 outline-none text-center rounded-full border leading-inherit text-text-color-2 text-xs ${
                            songType === 0
                                ? 'border-transparent font-semibold bg-primary-color-1 hover:bg-primary-hover-color-1'
                                : 'border-border-color-1 font-medium bg-primary-color-2 hover:text-text-color-1'
                        }`}
                    >
                        TẤT CẢ
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setSongType(1);
                        }}
                        className={`py-1 px-6 outline-none text-center rounded-full border leading-inherit text-text-color-2 text-xs ${
                            songType === 1
                                ? 'border-transparent font-semibold bg-primary-color-1 hover:bg-primary-hover-color-1'
                                : 'border-border-color-1 font-medium bg-primary-color-2 hover:text-text-color-1'
                        }`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setSongType(2);
                        }}
                        className={`py-1 px-6 outline-none text-center rounded-full border leading-inherit text-text-color-2 text-xs ${
                            songType === 2
                                ? 'border-transparent font-semibold bg-primary-color-1 hover:bg-primary-hover-color-1'
                                : 'border-border-color-1 font-medium bg-primary-color-2 hover:text-text-color-1'
                        }`}
                    >
                        QUỐC TẾ
                    </button>
                </div>
                <div className="flex items-center text-text-color-3 gap-1 cursor-pointer hover:text-text-color-primary-2">
                    <span className="text-xs font-medium mr-[2px]">TẤT CẢ</span>
                    <span className="mb-1">
                        <BsChevronRight size={18} />
                    </span>
                </div>
            </div>
            <div className="flex w-full flex-wrap gap-x-7">
                {songContent
                    ?.filter((item, index) => index < 12)
                    ?.map((item) => (
                        <SongItem key={item?.encodeId} data={item} />
                    ))}
            </div>
        </div>
    );
}

export default NewRelease;
