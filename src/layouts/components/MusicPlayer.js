import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDetailSongApi, getSongApi } from '../../apis';
import {
    AiFillHeart,
    AiOutlineHeart,
    BsThreeDots,
    BiShuffle,
    MdSkipPrevious,
    BsPlayCircle,
    BsPauseCircle,
    MdSkipNext,
    CiRepeat,
} from '../../assets/icons';

function MusicPlayer() {
    const { currentSongId } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [song, setSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioElement = new Audio();

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                getDetailSongApi(currentSongId),
                getSongApi(currentSongId),
            ]);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                setSong(res2.data.data['128']);
            }
        };
        fetchDetailSong();
    }, [currentSongId]);

    const handleTogglePlaying = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="bg-primary-color-3 px-5 h-full flex cursor-pointer">
            {songInfo && (
                <div className="w-[30%] flex-auto flex items-center">
                    <img
                        src={songInfo.thumbnail}
                        className="w-16 h-16 object-cover rounded-md mr-[10px]"
                        alt="thumbnail"
                    />
                    <div className="flex flex-col">
                        <span className="text-text-color-2 text-sm font-semibold text-clip overflow-visible">
                            {songInfo.title}
                        </span>
                        <span className="text-xs text-text-color-3 font-semibold text-ellipsis overflow-hidden hover:underline hover:text-[#E9638F]">
                            {songInfo.artistsNames}
                        </span>
                    </div>
                    <div className="text-text-color-2 flex gap-2 items-center ml-4">
                        <span
                            title="Thêm vào thư viện"
                            className="mx-[2px] p-1 hover:bg-opacity-color-1 rounded-full"
                        >
                            <AiOutlineHeart size={18} />
                        </span>
                        <span
                            title="Xem thêm"
                            className="mx-[2px] p-1 hover:bg-opacity-color-1 rounded-full"
                        >
                            <BsThreeDots size={18} />
                        </span>
                    </div>
                </div>
            )}
            {songInfo && (
                <div className="w-[40%] flex-auto flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-center text-text-color-2 gap-7">
                        <span
                            title="Bật phát ngẫu nhiên"
                            className="p-1 hover:bg-opacity-color-1 rounded-full"
                        >
                            <BiShuffle size={24} />
                        </span>
                        <span className="p-1 hover:bg-opacity-color-1 rounded-full">
                            <MdSkipPrevious size={28} />
                        </span>
                        <span className="hover:text-[#CA4974]" onClick={handleTogglePlaying}>
                            {isPlaying ? <BsPauseCircle size={36} /> : <BsPlayCircle size={36} />}
                        </span>
                        <span className="p-1 hover:bg-opacity-color-1 rounded-full">
                            <MdSkipNext size={28} />
                        </span>
                        <span
                            title="Bật phát lại tất cả"
                            className="p-1 hover:bg-opacity-color-1 rounded-full"
                        >
                            <CiRepeat size={26} />
                        </span>
                    </div>
                    <div>Progress bar</div>
                </div>
            )}
            {songInfo && <div className="w-[30%] flex-auto">Volume</div>}
        </div>
    );
}

export default MusicPlayer;
