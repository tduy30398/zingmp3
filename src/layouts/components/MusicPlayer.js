/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { getDetailSongAPI, getSongAPI } from '../../APIs';
import {
    AiOutlineHeart,
    BsThreeDots,
    BiShuffle,
    MdSkipPrevious,
    BsPlayCircle,
    BsPauseCircle,
    MdSkipNext,
    CiRepeat,
    MdOutlineQueueMusic,
    BiVolumeFull,
    BiVolumeMute,
    TbMicrophone2,
    SlScreenDesktop,
} from '../../assets/icons/staticIcons';
import {
    setIsPlaying,
    setCurrentSongId,
    setCurrentSongDetail,
    setRecentSongsList,
} from '../../redux/actions';
import { PlayerProgressBar } from '../components';
import { RotatingLinesLoading } from '../../assets/icons/dynamicIcons';

function MusicPlayer({ setIsShowRightSidebar, isShowRightSidebar }) {
    const { currentSongId, isPlaying, isTyping, albumSongs } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoadingSong, setIsLoadingSong] = useState(false);
    const [volume, setVolume] = useState(50);
    const [audio, setAudio] = useState(new Audio());

    const dispatch = useDispatch();

    // Call API
    useEffect(() => {
        const fetchDetailSong = async () => {
            audio.pause();
            // Set icon loading tại play button khi bắt đầu gọi API
            setIsLoadingSong(true);
            //Promise.all sẽ nhận các Promise làm đầu vào và chỉ thành
            //công khi tất cả các Promise đầu vào thành công
            const [res1, res2] = await Promise.all([
                getDetailSongAPI(currentSongId),
                getSongAPI(currentSongId),
            ]);
            // Ẩn icon loading tại play button khi gọi API xong
            setIsLoadingSong(false);

            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
                setSongInfo(res1.data.data);
                dispatch(setCurrentSongDetail(res1.data.data));
                dispatch(
                    setRecentSongsList({
                        encodeId: res1.data.data.encodeId,
                        thumbnail: res1.data.data.thumbnail,
                        artists: res1.data.data.artists,
                        title: res1.data.data.title,
                    }),
                );
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(setIsPlaying(false));
                toast.warn(res2.data.msg);
            }
        };
        fetchDetailSong();
    }, [currentSongId]);

    // Handle when end song
    useEffect(() => {
        const handleEnded = () => {
            setIsEnd((prev) => !prev);
            if (isRepeat) {
                audio.play();
                dispatch(setIsPlaying(true));
            } else if (isShuffle) {
                randomSong();
            } else {
                handleNextSong();
            }
        };
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isEnd, isRepeat, isShuffle]);

    // Handle when press space button on keyboard
    useEffect(() => {
        const detectKeyDown = (e) => {
            if (e.keyCode === 32 && !isTyping) {
                handleTogglePlaying();
            }
        };
        document.addEventListener('keydown', detectKeyDown);

        return () => {
            document.removeEventListener('keydown', detectKeyDown);
        };
    }, [isPlaying, audio, isTyping]);

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);

    const handleTogglePlaying = () => {
        if (!isLoadingSong) {
            if (isPlaying) {
                audio.pause();
                dispatch(setIsPlaying(false));
            } else {
                audio.play();
                dispatch(setIsPlaying(true));
            }
        }
    };

    const randomSong = () => {
        const randomIndex = Math.round(Math.random() * albumSongs?.length) - 1;
        dispatch(setCurrentSongId(albumSongs[randomIndex].encodeId));
        dispatch(setIsPlaying(true));
    };

    // Handle when click on next button
    const handleNextSong = () => {
        if (albumSongs) {
            let currentSongIndex = albumSongs?.findIndex((song) => song.encodeId === currentSongId);
            currentSongIndex = currentSongIndex === albumSongs?.length - 1 ? -1 : currentSongIndex;
            dispatch(setCurrentSongId(albumSongs[currentSongIndex + 1]?.encodeId));
            dispatch(setIsPlaying(true));
        }
    };

    // Handle when click on prev button
    const handlePrevSong = () => {
        if (albumSongs) {
            let currentSongIndex = albumSongs?.findIndex((song) => song.encodeId === currentSongId);
            currentSongIndex = currentSongIndex === 0 ? albumSongs?.length : currentSongIndex;
            dispatch(setCurrentSongId(albumSongs[currentSongIndex - 1]?.encodeId));
            dispatch(setIsPlaying(true));
        }
    };

    // Handle when click on shuffle button
    const handleShuffleSong = () => {
        setIsShuffle((prev) => !prev);
    };

    // Handle when click on repeat button
    const handleRepeatSong = () => {
        setIsRepeat((prev) => !prev);
    };

    const handleToggleVolume = () => {
        setVolume((prev) => (+prev === 0 ? 50 : 0));
    };

    const artistsLength = songInfo?.artists?.length;

    return (
        <div className="bg-primary-color-3 px-5 h-full flex cursor-pointer">
            <div className="w-[30%] flex-auto flex items-center">
                <div className="w-full flex-auto flex items-center">
                    <img
                        src={songInfo?.thumbnail || `https://avatar.talk.zdn.vn/default.jpg`}
                        className="w-16 h-16 object-cover rounded-md mr-[10px]"
                        alt="thumbnail"
                    />
                    <div className="flex flex-col">
                        <span className="text-text-color-2 text-sm font-semibold text-clip overflow-visible">
                            {songInfo?.title}
                        </span>
                        <span className="text-text-color-3 text-xs font-semibold overflow-ellipsis-2-line">
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
                        </span>
                    </div>
                    <div className="text-text-color-2 flex gap-2 items-center ml-4">
                        <span
                            title="Thêm vào thư viện"
                            className="mx-0.5 p-1 hover:bg-opacity-color-1 rounded-full"
                        >
                            <AiOutlineHeart size={18} />
                        </span>
                        <span
                            title="Xem thêm"
                            className="mx-0.5 p-1 hover:bg-opacity-color-1 rounded-full"
                        >
                            <BsThreeDots size={18} />
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-[40%] flex-auto flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-center text-text-color-2 gap-7">
                    <span
                        title={isShuffle ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}
                        className={
                            albumSongs
                                ? `p-1 hover:bg-opacity-color-1 rounded-full ${
                                      isShuffle ? 'text-text-color-primary-1' : 'text-text-color-2'
                                  }`
                                : 'text-[#67455E] cursor-not-allowed'
                        }
                        onClick={handleShuffleSong}
                    >
                        <BiShuffle size={24} />
                    </span>
                    <span
                        title="Bài trước đó"
                        onClick={handlePrevSong}
                        className={
                            albumSongs
                                ? 'p-1 hover:bg-opacity-color-1 rounded-full'
                                : 'text-[#67455E] cursor-not-allowed'
                        }
                    >
                        <MdSkipPrevious size={28} />
                    </span>
                    <span className="hover:text-text-color-primary-1" onClick={handleTogglePlaying}>
                        {isLoadingSong ? (
                            <div className="p-[5px] border-[3px] border-[#FFFFFF] rounded-full cursor-not-allowed">
                                <RotatingLinesLoading width={20} />
                            </div>
                        ) : isPlaying ? (
                            <BsPauseCircle size={36} />
                        ) : (
                            <BsPlayCircle size={36} />
                        )}
                    </span>
                    <span
                        title="Bài tiếp theo"
                        onClick={handleNextSong}
                        className={
                            albumSongs
                                ? 'p-1 hover:bg-opacity-color-1 rounded-full'
                                : 'text-[#67455E] cursor-not-allowed'
                        }
                    >
                        <MdSkipNext size={28} />
                    </span>
                    <span
                        title={isRepeat ? 'Tắt phát lại bài hiện tại' : 'Bật phát lại bài hiện tại'}
                        className={`p-1 hover:bg-opacity-color-1 rounded-full ${
                            isRepeat ? 'text-text-color-primary-1' : 'text-text-color-2'
                        }`}
                        onClick={handleRepeatSong}
                    >
                        <CiRepeat size={26} />
                    </span>
                </div>
                <PlayerProgressBar audio={audio} songInfo={songInfo} />
            </div>

            <div className="w-[30%] flex-auto flex justify-end items-center">
                <div className="flex">
                    <div className="flex items-center pr-5 gap-1 border-r-[1px] border-border-color-1">
                        <span
                            title="Xem lời bài hát"
                            className="text-text-color-2 p-1 mx-[1px] hover:bg-opacity-color-1 rounded-full"
                        >
                            <TbMicrophone2 size={18} />
                        </span>
                        <span
                            title="Chế độ cửa sổ"
                            className="text-text-color-2 p-1 mx-[1px] hover:bg-opacity-color-1 rounded-full"
                        >
                            <SlScreenDesktop size={18} />
                        </span>
                        <span
                            onClick={handleToggleVolume}
                            className="text-text-color-2 p-1 mx-[1px] hover:bg-opacity-color-1 rounded-full"
                        >
                            {+volume === 0 ? (
                                <BiVolumeMute size={18} />
                            ) : (
                                <BiVolumeFull size={18} />
                            )}
                        </span>
                        <input
                            className="ml-1 h-1 w-[70px] hover:h-1.5 outline-none cursor-pointer"
                            type="range"
                            step={1}
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        />
                    </div>

                    <span
                        onClick={() => setIsShowRightSidebar((prev) => !prev)}
                        title="Danh sách phát"
                        className={`text-text-color-2 p-1 rounded-[4px] hover:text-text-color-3 ml-5 ${
                            isShowRightSidebar ? 'bg-primary-color-1' : 'bg-[#5E3153]'
                        }`}
                    >
                        <MdOutlineQueueMusic size={22} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
