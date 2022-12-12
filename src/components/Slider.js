import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BsChevronLeft, BsChevronRight } from '../assets/icons';
import { setCurrentSongId, isPlay, setAlbumSongs } from '../redux/actions';

function Slider() {
    const { banners } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        const sliderEls = document.getElementsByClassName('slider-item');
        let min = 0;
        let max = 2;
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1);
            for (let i = 0; i < sliderEls.length; i++) {
                sliderEls[i].classList.remove('animate-slide-right', 'order-last', 'z-0');
                sliderEls[i].classList.remove('animate-slide-left', 'order-first', 'z-10');
                sliderEls[i].classList.remove('animate-slide-left2', 'order-2', 'z-10');

                if (list.some((item) => item === i)) {
                    sliderEls[i].style.cssText = 'display: block';
                } else {
                    sliderEls[i].style.cssText = 'display: none';
                }
            }
            list.forEach((item) => {
                if (item === max) {
                    sliderEls[item]?.classList.add('animate-slide-right', 'order-last', 'z-0');
                } else if (item === min) {
                    sliderEls[item]?.classList.add('animate-slide-left', 'order-first', 'z-10');
                } else {
                    sliderEls[item]?.classList.add('animate-slide-left2', 'order-2', 'z-10');
                }
            });
            min = min === sliderEls.length - 1 ? 0 : min + 1;
            max = max === sliderEls.length - 1 ? 0 : max + 1;
        }, 4000);
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, []);

    const handleClickBanner = (banner) => {
        if (banner?.type === 1) {
            dispatch(setCurrentSongId(banner.encodeId));
            dispatch(setAlbumSongs(null));
            dispatch(isPlay(true));
        } else if (banner?.type === 4) {
            navigate(banner.link);
        } else {
            dispatch(setAlbumSongs(null));
        }
    };

    return (
        <div className="w-full overflow-hidden px-[59px]">
            <div className="flex gap-8 pt-8 relative group">
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
                <div className="z-20 flex justify-center items-center w-[55px] h-[55px] cursor-pointer text-text-color-2 rounded-[50%] absolute top-[45%] left-[15px] bg-opacity-color-1 opacity-0 group-hover:opacity-100 hover:text-text-color-1">
                    <BsChevronLeft size={28} />
                </div>
                <div className="z-20 flex justify-center items-center w-[55px] h-[55px] cursor-pointer text-text-color-2 rounded-[50%] absolute top-[45%] right-[15px] bg-opacity-color-1 opacity-0 group-hover:opacity-100 hover:text-text-color-1">
                    <BsChevronRight size={28} />
                </div>
            </div>
        </div>
    );
}

export default Slider;
