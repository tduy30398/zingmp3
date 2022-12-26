import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaPlay } from '../../../assets/icons/staticIcons';
import { setCurrentSongId, setIsPlaying } from '../../../redux/actions';
import { AudioLoading } from '../../../assets/icons/dynamicIcons';

function SongSearchItem({ data }) {
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    const handleClickSong = () => {
        dispatch(setCurrentSongId(data?.encodeId));
        dispatch(setIsPlaying(true));
    };
    return (
        <div className="w-[90%] mb-2 md:w-[45%] md:mb-2 lg:w-[30%] lg:mb-0  flex-auto p-[10px] gap-4 flex rounded-[4px] group bg-primary-color-8 hover:bg-primary-color-9">
            <div onClick={handleClickSong} className="relative">
                <img
                    className="w-[84px] h-[84px] rounded object-cover"
                    src={data?.thumbnail}
                    alt={data?.artistsNames}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] bg-overlay-40 cursor-pointer hidden group-hover:block">
                    <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                        <FaPlay size={16} />
                    </span>
                </div>
                {data?.encodeId === currentSongId ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] bg-overlay-40 cursor-pointer">
                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                            {isPlaying ? (
                                <AudioLoading height={'30'} width={'30'} color={'#FFFFFF'} />
                            ) : (
                                <FaPlay size={20} />
                            )}
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-text-color-3 text-xs font-normal select-none mb-[6px]">
                    Bài hát
                </span>
                <span className="text-text-color-2 text-sm font-extrabold select-none mb-[2px] overflow-ellipsis-2-line">
                    {data?.title}
                </span>
                <span className="text-text-color-3 text-xs font-semibold">
                    <span className="cursor-pointer hover:underline hover:text-text-color-primary-2">
                        {data?.artistsNames?.length > 30
                            ? `${data?.artistsNames?.slice(0, 30)}...`
                            : data?.artistsNames}
                    </span>
                </span>
            </div>
        </div>
    );
}

export default memo(SongSearchItem);