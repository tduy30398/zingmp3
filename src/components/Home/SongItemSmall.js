import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaPlay } from '../../assets/icons/staticIcons';
import { setCurrentSongId, setIsPlaying } from '../../redux/actions';
import { AudioLoading } from '../../assets/icons/dynamicIcons';

function SongItemSmall({ data }) {
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    const handleClickSong = () => {
        dispatch(setCurrentSongId(data?.encodeId));
        dispatch(setIsPlaying(true));
    };
    return (
        <div
            className={`w-full p-[10px] gap-[10px] flex rounded-[4px] group ${
                data?.encodeId === currentSongId ? 'bg-primary-color-1' : 'hover:bg-primary-color-8'
            }`}
        >
            <div onClick={() => handleClickSong()} className="relative">
                <img
                    className="w-[40px] h-[40px] rounded object-cover"
                    src={data?.thumbnail}
                    alt={data?.artistsNames}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] bg-overlay-40 cursor-pointer hidden group-hover:block">
                    <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                        <FaPlay size={14} />
                    </span>
                </div>
                {data?.encodeId === currentSongId ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] cursor-pointer bg-overlay-40">
                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                            {isPlaying ? (
                                <AudioLoading height={'20'} width={'20'} color={'#FFFFFF'} />
                            ) : (
                                <FaPlay size={14} />
                            )}
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="flex flex-col justify-between">
                <span className="text-text-color-2 text-sm font-semibold select-none">
                    {data?.title?.length > 24 ? `${data?.title.slice(0, 24)}...` : data?.title}
                </span>
                <span className="text-text-color-3 text-xs font-semibold">
                    <span
                        className={`cursor-pointer hover:underline ${
                            data?.encodeId === currentSongId
                                ? ''
                                : 'hover:text-text-color-primary-2'
                        } `}
                    >
                        {data?.artistsNames?.length > 24
                            ? `${data?.artistsNames.slice(0, 24)}...`
                            : data?.artistsNames}
                    </span>
                </span>
            </div>
        </div>
    );
}

export default memo(SongItemSmall);
