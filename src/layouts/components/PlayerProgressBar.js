/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, memo } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

var intervalId;
function PlayerProgressBar({ audio, songInfo }) {
    const { isPlaying } = useSelector((state) => state.music);
    const [second, setSecond] = useState(0);

    // thumb là thanh chạy ở trên
    const thumbRef = useRef();
    // track là thanh nằm yên ở dưới
    const trackRef = useRef();

    useEffect(() => {
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

    // Handle when click on progress bar
    const handleClickProgress = (e) => {
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

    return (
        <div className="w-full flex justify-center items-center gap-[10px] select-none">
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
                {songInfo ? moment.utc(songInfo?.duration * 1000).format('mm:ss') : '00:00'}
            </span>
        </div>
    );
}

export default memo(PlayerProgressBar);
