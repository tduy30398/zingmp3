import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { BsMusicNoteBeamed, FaPlay } from '../assets/icons';
import { setCurrentSongId } from '../redux/actions';
import { isPlay } from '../redux/actions';

function AlbumSong({ songInfo }) {
    const { currentSongId } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickSong = () => {
        dispatch(setCurrentSongId(songInfo.encodeId));
        dispatch(isPlay(true));
    };

    return (
        <div
            onDoubleClick={handleClickSong}
            className={`flex justify-between p-[10px] border-b-[1px] border-border-color-2 rounded-[4px] group ${
                songInfo?.encodeId === currentSongId ? 'bg-[#542D4A]' : 'hover:bg-[#542D4A]'
            }`}
        >
            <div className="flex items-center flex-5">
                <span className="mr-[10px] cursor-pointer">
                    <BsMusicNoteBeamed size={15} />
                </span>
                <div
                    className="relative cursor-pointer mr-[10px]"
                    onClick={() => handleClickSong()}
                >
                    <img
                        className="w-10 h-10 rounded-[4px] object-cover group-hover:opacity-30"
                        src={songInfo.thumbnail}
                        alt={songInfo.title}
                    />
                    <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 hidden group-hover:block">
                        <FaPlay size={16} />
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-5 text-text-color-2 select-none">
                        {songInfo?.title.length > 30
                            ? `${songInfo?.title.slice(0, 30)}...`
                            : songInfo?.title}
                    </span>
                    <h3 className="text-xs font-medium leading-5">
                        <span className="cursor-pointer hover:underline hover:text-text-color-primary-2">
                            {songInfo?.artistsNames}
                        </span>
                    </h3>
                </div>
            </div>
            <span className="text-xs font-medium leading-5 flex-4 flex items-center">
                <span
                    onClick={() => navigate(songInfo?.album.link)}
                    className="cursor-pointer hover:underline hover:text-text-color-primary-2"
                >
                    {songInfo?.album?.title.length > 35
                        ? `${songInfo?.album?.title.slice(0, 35)}...`
                        : songInfo?.album?.title}
                </span>
            </span>
            <span className="text-xs font-medium leading-5 flex-1 flex justify-end mr-1">
                {moment.utc(songInfo.duration * 1000).format('mm:ss')}
            </span>
        </div>
    );
}

export default memo(AlbumSong);
