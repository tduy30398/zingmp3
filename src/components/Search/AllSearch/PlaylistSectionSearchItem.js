import { useRef, memo } from 'react';
import { Link } from 'react-router-dom';

import { BsPlayCircle } from '../../../assets/icons/staticIcons';

function PlaylistSectionSearchItem({ item }) {
    const imgRef = useRef('');

    const handleMouseEnter = () => {
        imgRef.current.classList.remove('animate-scale-down-image');
        imgRef.current.classList.add('animate-scale-up-image');
    };

    const handleMouseLeave = () => {
        imgRef.current.classList.remove('animate-scale-up-image');
        imgRef.current.classList.add('animate-scale-down-image');
    };

    const artistsLength = item?.artists?.length;

    return (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col gap-1 px-[14px] select-none">
            <Link
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full relative overflow-hidden rounded-[5px]"
                to={item?.link}
            >
                <img
                    ref={imgRef}
                    className="w-full h-auto object-cover mb-1"
                    src={item?.thumbnail}
                    alt={item?.title}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer group hover:bg-overlay-50">
                    <div
                        className={
                            'absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 opacity-0 group-hover:opacity-100'
                        }
                    >
                        <span className="hover:text-text-color-1">
                            <BsPlayCircle size={45} />
                        </span>
                    </div>
                </div>
            </Link>
            {item?.title && (
                <Link
                    to={item?.link}
                    title={item?.title}
                    className="text-text-color-2 text-sm font-bold cursor-pointer hover:text-text-color-primary-1"
                >
                    {item?.title?.length > 22 ? `${item?.title?.slice(0, 22)}...` : item?.title}
                </Link>
            )}
            <span className="text-text-color-3 text-xs font-semibold overflow-ellipsis-2-line">
                {item?.artists?.map((artist, index) => (
                    <Link
                        key={artist?.link}
                        to={artist?.link}
                        className="cursor-pointer hover:underline hover:text-text-color-primary-2"
                    >
                        {index === artistsLength - 1 ? `${artist?.name}` : `${artist?.name}, `}
                    </Link>
                ))}
            </span>
        </div>
    );
}

export default memo(PlaylistSectionSearchItem);
