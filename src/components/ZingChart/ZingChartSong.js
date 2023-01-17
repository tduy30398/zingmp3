import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { FaPlay } from '../../assets/icons/staticIcons';
import { AudioLoading } from '../../assets/icons/dynamicIcons';
import { setCurrentSongId, setIsPlaying } from '../../redux/actions';

function ZingChartSong({ songInfo, index }) {
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    const handleClickSong = () => {
        dispatch(setCurrentSongId(songInfo.encodeId));
        dispatch(setIsPlaying(true));
    };

    const artistsLength = songInfo?.artists?.length;

    return (
        <div
            onDoubleClick={handleClickSong}
            className={`flex justify-between select-none p-[10px] border-b-[1px] border-border-color-2 rounded-[4px] group ${
                songInfo?.encodeId === currentSongId
                    ? 'bg-primary-color-8'
                    : 'hover:bg-primary-color-8'
            }`}
        >
            <div className="flex items-center flex-5">
                <span
                    className={`mr-[15px] w-[60px] flex items-center justify-center text-[32px] text-[#411636] ${
                        index === 0
                            ? 'text-shadow-1'
                            : index === 1
                            ? 'text-shadow-2'
                            : index === 2
                            ? 'text-shadow-3'
                            : 'text-shadow-4'
                    }`}
                >
                    {index + 1}
                </span>
                <div className="relative cursor-pointer mr-[10px]" onClick={handleClickSong}>
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-[4px] object-cover group-hover:opacity-30"
                            src={songInfo.thumbnail}
                            alt={songInfo.title}
                        />
                    </div>
                    {songInfo?.encodeId !== currentSongId && (
                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 cursor-pointer hidden group-hover:block">
                            <FaPlay size={16} />
                        </span>
                    )}
                    {songInfo?.encodeId === currentSongId ? (
                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 cursor-pointer">
                            {isPlaying ? (
                                <AudioLoading height={'25'} width={'25'} color={'#FFFFFF'} />
                            ) : (
                                <FaPlay size={16} />
                            )}
                        </span>
                    ) : (
                        ''
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-5 text-text-color-2">
                        {songInfo?.title.length > 30
                            ? `${songInfo?.title.slice(0, 30)}...`
                            : songInfo?.title}
                    </span>
                    <h3 className="text-xs font-medium leading-5 text-text-color-3 overflow-ellipsis-2-line">
                        {songInfo?.artists?.map((artist, index) => (
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
                    </h3>
                </div>
            </div>
            <span className="text-xs font-medium leading-5 flex-4 hidden md:flex items-center">
                <Link
                    to={songInfo?.album?.link}
                    className="cursor-pointer text-text-color-3 hover:underline hover:text-text-color-primary-2"
                >
                    {songInfo?.album?.title.length > 35
                        ? `${songInfo?.album?.title.slice(0, 35)}...`
                        : songInfo?.album?.title}
                </Link>
            </span>
            <span className="text-xs font-medium leading-5 flex-1 flex justify-end items-center mr-1 text-text-color-3">
                {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
            </span>
        </div>
    );
}

export default memo(ZingChartSong);
