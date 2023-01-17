/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, memo } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

var intervalId;
function PlayerProgressBar({ audio, songInfo }) {
    const { isPlaying } = useSelector((state) => state.music);
    const [second, setSecond] = useState(0);
    const [percent, setPercent] = useState(0);
    const [isHoverProgressBar, setIsHoverProgressBar] = useState(false);

    const sliderRef = useRef('');
    const thumbRef = useRef('');

    useEffect(() => {
        audio.load();

        if (isPlaying) {
            audio.play();
        }

        intervalId = setInterval(() => {
            // lấy ra phần trăm đã chạy được của bài hát và set tỉ lệ vào thumb bar
            let percent = Math.round((audio.currentTime / songInfo?.duration) * 100);
            // Do đang set position là right, và đang muốn thumb bar chạy từ trái sang phải
            // => phần trăm phải chạy từ 100 về 0
            if (thumbRef.current) {
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
            }
            if (sliderRef.current) {
                sliderRef.current.style.background = `linear-gradient(to right, #ffffff ${percent}%, #825F79 ${percent}%)`;
            }
            setSecond(Math.round(audio.currentTime));
        }, 200);

        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [audio]);

    useEffect(() => {
        setPercent(Math.round((audio.currentTime / songInfo?.duration) * 100) || 0);
    }, [audio.currentTime]);

    const handleProgressChange = (e) => {
        const time = (percent * songInfo.duration) / 100;
        audio.currentTime = time;
        setPercent(+e.target.value);
        setSecond(Math.round(time));
        if (thumbRef.current) {
            thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        }
        if (sliderRef.current) {
            sliderRef.current.style.background = `linear-gradient(to right, #ffffff ${percent}%, #825F79 ${percent}%)`;
        }
    };

    return (
        <div className="w-full flex justify-center items-center gap-[10px] select-none">
            <span className="text-text-color-3 text-xs font-medium">
                {moment.utc(second * 1000).format('mm:ss')}
            </span>
            <div
                onMouseEnter={() => setIsHoverProgressBar(true)}
                onMouseLeave={() => setIsHoverProgressBar(false)}
                className="w-full flex items-center"
            >
                <input
                    className={`w-full outline-none rounded-full cursor-pointer ${
                        isHoverProgressBar ? 'block' : 'hidden'
                    }`}
                    ref={sliderRef}
                    type="range"
                    step={1}
                    min={0}
                    max={100}
                    value={percent || 0}
                    onChange={handleProgressChange}
                />

                <div
                    className={`h-1 w-full outline-none rounded-full bg-primary-color-6 relative ${
                        isHoverProgressBar ? 'hidden' : 'block'
                    }`}
                >
                    <div
                        ref={thumbRef}
                        className="absolute top-0 bottom-0 left-0 rounded-full bg-primary-color-7"
                    ></div>
                </div>
            </div>
            <span className="text-text-color-2 text-xs font-medium">
                {songInfo ? moment.utc(songInfo?.duration * 1000).format('mm:ss') : '00:00'}
            </span>
        </div>
    );
}

export default memo(PlayerProgressBar);
