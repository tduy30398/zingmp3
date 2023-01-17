import { useRef, memo } from 'react';
import { Link } from 'react-router-dom';

import { BiShuffle, AiOutlineUserAdd } from '../../../assets/icons/staticIcons';

function Artist({ item }) {
    const imgRef = useRef('');

    const handleMouseEnter = () => {
        imgRef.current.classList.remove('animate-scale-down-image');
        imgRef.current.classList.add('animate-scale-up-image');
    };

    const handleMouseLeave = () => {
        imgRef.current.classList.remove('animate-scale-up-image');
        imgRef.current.classList.add('animate-scale-down-image');
    };

    return (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col items-center">
            <Link
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                to={item?.link}
                className="w-full relative overflow-hidden rounded-full"
            >
                <img
                    ref={imgRef}
                    className="w-full h-auto object-cover"
                    src={item?.thumbnail}
                    alt={item?.title}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer group">
                    <div
                        className={
                            'absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 opacity-0 group-hover:opacity-100'
                        }
                    >
                        <span className="hover:text-text-color-1">
                            <BiShuffle size={35} />
                        </span>
                    </div>
                </div>
            </Link>
            {item?.name && (
                <Link
                    title={item?.name}
                    to={item?.link}
                    className="text-text-color-2 text-center mt-[15px] mb-1 text-sm font-medium cursor-pointer hover:text-text-color-primary-1 hover:underline"
                >
                    {item?.name?.length > 22 ? `${item?.name?.slice(0, 22)}...` : item?.name}
                </Link>
            )}
            <span className="text-text-color-3 text-xs text-center font-semibold">
                <span>
                    {item?.totalFollow > 1000000
                        ? `${(item?.totalFollow / 1000000).toFixed(1)}M quan tâm`
                        : item?.totalFollow > 1000
                        ? `${Math.round(item?.totalFollow / 1000)}K quan tâm`
                        : `${item?.totalFollow} quan tâm`}
                </span>
            </span>
            <span className="py-1.5 cursor-pointer px-[19px] leading-[14px] mb-5 mt-[15px] flex outline-none text-center rounded-full border text-text-color-2 text-xs border-border-color-1 font-medium bg-primary-color-5 hover:text-text-color-1 hover:bg-primary-color-4">
                <span className="mr-1">
                    <AiOutlineUserAdd size={15} />
                </span>
                <span>QUAN TÂM</span>
            </span>
        </div>
    );
}

export default memo(Artist);
