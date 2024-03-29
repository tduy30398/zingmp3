import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaPlay } from '../../assets/icons/staticIcons';
import { setCurrentSongId, setIsPlaying } from '../../redux/actions';
import { AudioLoading } from '../../assets/icons/dynamicIcons';

function SongItemChartHome({ data, index, totalScore }) {
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    const handleClickSong = () => {
        dispatch(setCurrentSongId(data?.encodeId));
        dispatch(setIsPlaying(true));
    };

    const artistsLength = data?.artists?.length;

    return (
        <div
            onDoubleClick={handleClickSong}
            className={`w-full select-none p-[10px] gap-[10px] flex items-center justify-between rounded-[4px] bg-opacity-color-2 mb-[10px] group ${
                data?.encodeId === currentSongId ? 'bg-opacity-color-2' : 'hover:bg-opacity-color-3'
            }`}
        >
            <div className="flex items-center">
                <span
                    className={`w-[40px] flex items-center justify-center text-[32px] text-[rgba(172,52,147,0.9)] ${
                        index === 0
                            ? 'text-shadow-1'
                            : index === 1
                            ? 'text-shadow-2'
                            : 'text-shadow-3'
                    }`}
                >
                    {index + 1}
                </span>
                <div onClick={handleClickSong} className="relative">
                    <div className="w-[60px] h-[60px] mr-[10px]">
                        <img
                            className="w-full h-full rounded-[4px] object-cover"
                            src={data?.thumbnail}
                            alt={data?.artistsNames}
                        />
                    </div>
                    {data?.encodeId !== currentSongId && (
                        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] mr-[10px] bg-overlay-40 cursor-pointer hidden group-hover:block">
                            <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                                <FaPlay size={14} />
                            </span>
                        </div>
                    )}
                    {data?.encodeId === currentSongId ? (
                        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] mr-[10px] cursor-pointer bg-overlay-40">
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
                    <span className="text-text-color-2 mb-1 text-sm font-semibold">
                        {data?.title?.length > 30 ? `${data?.title.slice(0, 30)}...` : data?.title}
                    </span>
                    <span className="text-text-color-3 text-xs font-semibold overflow-ellipsis-2-line">
                        {data?.artists?.map((artist, index) => (
                            <Link
                                key={artist?.link}
                                to={artist?.link}
                                className="cursor-pointer hover:underline hover:text-text-color-primary-2"
                            >
                                {index === artistsLength - 1
                                    ? `${artist?.name}`
                                    : `${artist?.name}, `}
                            </Link>
                        ))}
                    </span>
                </div>
            </div>
            <span className="font-bold text-base mr-1">{`${Math.round(
                (data?.score * 100) / totalScore
            )}%`}</span>
        </div>
    );
}

export default memo(SongItemChartHome);
