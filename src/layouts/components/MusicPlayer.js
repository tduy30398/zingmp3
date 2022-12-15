/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getDetailSongApi, getSongApi } from '../../apis';
import {
    AiOutlineHeart,
    BsThreeDots,
    BiShuffle,
    MdSkipPrevious,
    BsPlayCircle,
    BsPauseCircle,
    MdSkipNext,
    CiRepeat,
} from '../../assets/icons';
import { isPlay, setCurrentSongId } from '../../redux/actions';
import { PlayerProgressBar } from '../components';
import { RotatingLinesLoading } from '../../components';

function MusicPlayer() {
    const { currentSongId, isPlaying, albumSongs } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoadingSong, setIsLoadingSong] = useState(false);
    const [audio, setAudio] = useState(new Audio());

    const dispatch = useDispatch();

    // Call API
    useEffect(() => {
        const fetchDetailSong = async () => {
            // Set icon loading tại play button khi bắt đầu gọi API
            setIsLoadingSong(true);
            const [res1, res2] = await Promise.all([
                getDetailSongApi(currentSongId),
                getSongApi(currentSongId),
            ]);
            // Ẩn icon loading tại play button khi gọi API xong
            setIsLoadingSong(false);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(isPlay(false));
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
                dispatch(isPlay(true));
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

    const handleTogglePlaying = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(isPlay(false));
        } else {
            audio.play();
            dispatch(isPlay(true));
        }
    };

    const randomSong = () => {
        const randomIndex = Math.round(Math.random() * albumSongs?.length) - 1;
        dispatch(setCurrentSongId(albumSongs[randomIndex].encodeId));
        dispatch(isPlay(true));
    };

    // Handle when click on next button
    const handleNextSong = () => {
        if (albumSongs) {
            let currentSongIndex;
            albumSongs?.forEach((song, index) => {
                if (song.encodeId === currentSongId) {
                    currentSongIndex = index;
                }
            });
            dispatch(setCurrentSongId(albumSongs[currentSongIndex + 1]?.encodeId));
            dispatch(isPlay(true));
        }
    };

    // Handle when click on prev button
    const handlePrevSong = () => {
        if (albumSongs) {
            let currentSongIndex;
            albumSongs?.forEach((song, index) => {
                if (song.encodeId === currentSongId) {
                    currentSongIndex = index;
                }
            });
            dispatch(setCurrentSongId(albumSongs[currentSongIndex - 1]?.encodeId));
            dispatch(isPlay(true));
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

    return (
        <div className="bg-primary-color-3 px-5 h-full flex cursor-pointer">
            <div className="w-[30%] flex-auto flex items-center">
                <img
                    src={songInfo?.thumbnail}
                    className="w-16 h-16 object-cover rounded-md mr-[10px]"
                    alt="thumbnail"
                />
                <div className="flex flex-col">
                    <span className="text-text-color-2 text-sm font-semibold text-clip overflow-visible">
                        {songInfo?.title}
                    </span>
                    <span className="text-xs text-text-color-3 font-semibold text-ellipsis overflow-hidden hover:underline hover:text-text-color-primary-2">
                        {songInfo?.artistsNames}
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

            <div className="w-[40%] flex-auto flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-center text-text-color-2 gap-7">
                    <span
                        title="Bật phát ngẫu nhiên"
                        className={`p-1 hover:bg-opacity-color-1 rounded-full ${
                            isShuffle ? 'text-text-color-primary-1' : 'text-text-color-2'
                        }`}
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
                            <div className="p-[5px] border-[3px] border-[#FFFFFF] rounded-full">
                                <RotatingLinesLoading />
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
                        title="Bật phát lại bài hiện tại"
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
            <div className="w-[30%] flex-auto">Volume</div>
        </div>
    );
}

export default MusicPlayer;
