/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BsChevronLeft, BsChevronRight } from '../../assets/icons/staticIcons';
import { setCurrentSongId, setIsPlaying, setAlbumSongs } from '../../redux/actions';

var intervalId;
function Slider() {
    const { banners } = useSelector((state) => state.app);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(2);
    const [isAuto, setIsAuto] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy ra array các banner hiện lên màn hình
    const getArrSlider = (start, end, number) => {
        const limit = start > end ? number : end;
        const output = [];
        for (let i = start; i <= limit; i++) {
            output.push(i);
        }
        if (start > end) {
            for (let i = 0; i <= end; i++) {
                output.push(i);
            }
        }
        return output;
    };

    useEffect(() => {
        // Ở lần đầu hoặc sau khi leave chuột khỏi các banner, các banner sẽ
        // slide theo chiều tăng dần
        if (isAuto) {
            intervalId = setInterval(() => {
                slideNextBanner();
            }, 4000);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [min, max, isAuto]);

    const slideNextBanner = () => {
        const sliderEls = document.getElementsByClassName('slider-item');
        const list = getArrSlider(min, max, sliderEls.length - 1);
        for (let i = 0; i < sliderEls.length; i++) {
            sliderEls[i].classList.remove('animate-slide-left', 'order-0', 'z-0');
            sliderEls[i].classList.remove('animate-slide-right', 'order-2', 'z-10');
            sliderEls[i].classList.remove('animate-slide-right2', 'order-1', 'z-10');
            sliderEls[i].classList.remove('animate-slide-right', 'order-2', 'z-0');
            sliderEls[i].classList.remove('animate-slide-left', 'order-0', 'z-10');
            sliderEls[i].classList.remove('animate-slide-left2', 'order-1', 'z-10');

            if (list.some((item) => item === i)) {
                sliderEls[i].style.cssText = 'display: block';
            } else {
                sliderEls[i].style.cssText = 'display: none';
            }
        }
        list.forEach((item) => {
            if (item === max) {
                sliderEls[item]?.classList.add('animate-slide-right', 'order-2', 'z-0');
            } else if (item === min) {
                sliderEls[item]?.classList.add('animate-slide-left', 'order-0', 'z-10');
            } else {
                sliderEls[item]?.classList.add('animate-slide-left2', 'order-1', 'z-10');
            }
        });
        setMin((prev) => (prev === sliderEls.length - 1 ? 0 : prev + 1));
        setMax((prev) => (prev === sliderEls.length - 1 ? 0 : prev + 1));
    };

    const slidePrevBanner = () => {
        const sliderEls = document.getElementsByClassName('slider-item');
        const list = getArrSlider(min, max, sliderEls.length - 1);
        for (let i = 0; i < sliderEls.length; i++) {
            sliderEls[i].classList.remove('animate-slide-left', 'order-0', 'z-0');
            sliderEls[i].classList.remove('animate-slide-right', 'order-2', 'z-10');
            sliderEls[i].classList.remove('animate-slide-right2', 'order-1', 'z-10');
            sliderEls[i].classList.remove('animate-slide-right', 'order-2', 'z-0');
            sliderEls[i].classList.remove('animate-slide-left', 'order-0', 'z-10');
            sliderEls[i].classList.remove('animate-slide-left2', 'order-1', 'z-10');

            if (list.some((item) => item === i)) {
                sliderEls[i].style.cssText = 'display: block';
            } else {
                sliderEls[i].style.cssText = 'display: none';
            }
        }
        list.forEach((item) => {
            if (item === min) {
                sliderEls[item]?.classList.add('animate-slide-left', 'order-0', 'z-0');
            } else if (item === max) {
                sliderEls[item]?.classList.add('animate-slide-right', 'order-2', 'z-10');
            } else {
                sliderEls[item]?.classList.add('animate-slide-right2', 'order-1', 'z-10');
            }
        });
        setMin((prev) => (prev === 0 ? sliderEls.length - 1 : prev - 1));
        setMax((prev) => (prev === 0 ? sliderEls.length - 1 : prev - 1));
    };

    // Handle when click on banner
    const handleClickBanner = (banner) => {
        if (banner?.type === 1) {
            dispatch(setCurrentSongId(banner.encodeId));
            dispatch(setAlbumSongs(null));
            dispatch(setIsPlaying(true));
        } else if (banner?.type === 4) {
            navigate(banner?.link, { state: { isPlayAlbum: false } });
        } else {
            dispatch(setAlbumSongs(null));
        }
    };

    // Handle when click on next banner button
    const handleSlideNextBanner = () => {
        setIsAuto(false);
        slideNextBanner();
    };

    // Handle when click on previous banner button
    const handleSlidePrevBanner = () => {
        setIsAuto(false);
        slidePrevBanner();
    };

    return (
        <div className="w-full overflow-hidden px-[59px]">
            <div onMouseLeave={() => setIsAuto(true)} className="flex gap-8 pt-8 relative group">
                {banners?.map((banner, index) => (
                    <img
                        key={banner.encodeId}
                        src={banner.banner}
                        alt="banner"
                        onClick={() => handleClickBanner(banner)}
                        className={`slider-item cursor-pointer flex-1 object-contain w-[30%] rounded-lg ${
                            index <= 2 ? 'block' : 'hidden'
                        }`}
                    />
                ))}
                <div
                    className="z-20 flex justify-center items-center w-[55px] h-[55px] cursor-pointer text-text-color-2 rounded-full absolute top-[45%] left-[15px] bg-opacity-color-1 opacity-0 group-hover:opacity-100 hover:text-text-color-1"
                    onClick={() => handleSlidePrevBanner()}
                >
                    <BsChevronLeft size={28} />
                </div>
                <div
                    className="z-20 flex justify-center items-center w-[55px] h-[55px] cursor-pointer text-text-color-2 rounded-full absolute top-[45%] right-[15px] bg-opacity-color-1 opacity-0 group-hover:opacity-100 hover:text-text-color-1"
                    onClick={() => handleSlideNextBanner()}
                >
                    <BsChevronRight size={28} />
                </div>
            </div>
        </div>
    );
}

export default Slider;
