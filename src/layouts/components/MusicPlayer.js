/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

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

var intervalId;
function MusicPlayer() {
    const { currentSongId, isPlaying, albumSongs } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [second, setSecond] = useState(0);
    const [audio, setAudio] = useState(new Audio());

    // thumb là thanh chạy ở trên
    const thumbRef = useRef();
    // track là thanh nằm yên ở dưới
    const trackRef = useRef();

    const dispatch = useDispatch();

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

    useEffect(() => {
        audio.pause();
        audio.load();
        if (isPlaying) {
            audio.play();
        }
        intervalId = setInterval(() => {
            // lấy ra phần trăm đã chạy được của bài hát và set tỉ lệ vào thumb bar
            let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
            // Do đang set position là right, và đang muốn thumb bar chạy từ trái sang phải
            // => phần trăm phải chạy từ 100 về 0
            thumbRef.current.style.cssText = `right: ${100 - percent}%`;
            setSecond(Math.round(audio.currentTime));
        }, 200);

        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [audio]);

    const handleTogglePlaying = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(isPlay(false));
        } else {
            audio.play();
            dispatch(isPlay(true));
        }
    };

    // Handle when click on progress bar
    const handleClickProgress = (e) => {
        console.log('sss');
        const trackRect = trackRef.current.getBoundingClientRect();
        // e.clientX là tọa độ theo chiều x tại vị trí click của trackbar
        // trackRect.left là tọa độ vị trí tận cùng bên trái của trackbar
        // trackRect.width là width của trackbar
        // Ý tưởng: lấy e.clientX trừ đi trackRect.left => ra khoảng cách từ
        // điểm click đến vị trí left và chia cho trackRect.width => sẽ ra tỉ
        // lệ: khoảng cách từ điểm click đến vị trí left so với width của trackbar
        const percent = Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100;
        // set percent vào thumb bar
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        // ở trên , ta lấy ra percent bằng công thức: percent = (time * 100) / duration
        // ở đây, ta lấy lại time (s) bằng công thức: time = (percent * duration) / 100
        const time = (percent * songInfo.duration) / 100;
        // sau khi có time (s), ta set lại cho audio.currentTime và second
        audio.currentTime = time;
        setSecond(Math.round(time));
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
                        className={
                            albumSongs
                                ? 'p-1 hover:bg-opacity-color-1 rounded-full'
                                : 'text-[#67455E] cursor-not-allowed'
                        }
                    >
                        <BiShuffle size={24} />
                    </span>
                    <span
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
                        {isPlaying ? <BsPauseCircle size={36} /> : <BsPlayCircle size={36} />}
                    </span>
                    <span
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
                        title="Bật phát lại tất cả"
                        className="p-1 hover:bg-opacity-color-1 rounded-full"
                    >
                        <CiRepeat size={26} />
                    </span>
                </div>
                <div className="w-full flex justify-center items-center gap-[10px]">
                    <span className="text-text-color-3 text-xs font-medium">
                        {moment.utc(second * 1000).format('mm:ss')}
                    </span>
                    <div
                        onClick={handleClickProgress}
                        ref={trackRef}
                        className="w-4/5 h-1 rounded-full bg-primary-color-6 relative hover:h-[6px] group"
                    >
                        <div
                            ref={thumbRef}
                            className="absolute top-0 left-0 h-1 rounded-full bg-primary-color-7 hover:h-[6px] group-hover:h-[6px]"
                        ></div>
                    </div>
                    <span className="text-text-color-2 text-xs font-medium">
                        {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
                    </span>
                </div>
            </div>
            <div className="w-[30%] flex-auto">Volume</div>
        </div>
    );
}

export default MusicPlayer;
