import { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';

import { FaPlay } from '../assets/icons';
import { setCurrentSongId, setIsPlaying } from '../redux/actions';
import { AudioLoading } from '../components';

function SongItem({ data }) {
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    const handleClickSong = () => {
        dispatch(setCurrentSongId(data?.encodeId));
        dispatch(setIsPlaying(true));
    };
    return (
        <div
            className={`w-[45%] lg:w-[30%] flex-auto p-[10px] gap-[10px] flex rounded-[4px] group ${
                data?.encodeId === currentSongId ? 'bg-[#542D4A]' : 'hover:bg-[#542D4A]'
            }`}
        >
            <div onClick={() => handleClickSong()} className="relative">
                <img
                    className="w-[60px] h-[60px] rounded object-cover"
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
                                <AudioLoading height={'25'} width={'25'} color={'#FFFFFF'} />
                            ) : (
                                <FaPlay size={16} />
                            )}
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="flex flex-col justify-between">
                <span className="text-text-color-2 text-sm font-semibold select-none">
                    {data?.title.length > 24 ? `${data?.title.slice(0, 24)}...` : data?.title}
                </span>
                <span className="text-text-color-3 text-xs font-semibold">
                    <span className="cursor-pointer hover:underline hover:text-text-color-primary-2">
                        {data?.artistsNames.length > 30
                            ? `${data?.artistsNames.slice(0, 30)}...`
                            : data?.artistsNames}
                    </span>
                </span>
                <span className="text-text-color-3 text-xs font-semibold select-none">
                    {moment(data?.releaseDate * 1000).fromNow()}
                </span>
            </div>
        </div>
    );
}

export default memo(SongItem);
