import { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaPlay } from '../../../assets/icons/staticIcons';
import { AudioLoading } from '../../../assets/icons/dynamicIcons';

function SingerSearchItem({ data }) {
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
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
        <Link
            to={data?.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-[90%] mb-2 md:w-[45%] md:mb-2 lg:w-[30%] lg:mb-0 flex-auto p-[10px] gap-4 flex rounded-[4px] cursor-pointer group bg-primary-color-8 hover:bg-primary-color-9"
        >
            <div className="relative rounded-full overflow-hidden">
                <div className="w-[84px] h-[84px]">
                    <img
                        ref={imgRef}
                        className="w-full h-full rounded-full object-cover"
                        src={data?.thumbnail}
                        alt={data?.artistsNames}
                    />
                </div>
                {data?.encodeId !== currentSongId && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-overlay-40 hidden group-hover:block">
                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                            <FaPlay size={16} />
                        </span>
                    </div>
                )}
                {data?.encodeId === currentSongId ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] bg-overlay-40">
                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2">
                            {isPlaying ? (
                                <AudioLoading height={'30'} width={'30'} color={'#FFFFFF'} />
                            ) : (
                                <FaPlay size={20} />
                            )}
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-text-color-3 text-xs font-normal select-none mb-1.5">
                    Nghệ sĩ
                </span>
                <span className="text-text-color-2 text-sm font-extrabold select-none mb-0.5 overflow-ellipsis-2-line">
                    {data?.name}
                </span>
                <span className="text-text-color-3 text-xs font-semibold">
                    <span>
                        {data?.totalFollow > 1000000
                            ? `${(data?.totalFollow / 1000000).toFixed(1)}M quan tâm`
                            : data?.totalFollow > 1000
                            ? `${Math.round(data?.totalFollow / 1000)}K quan tâm`
                            : `${data?.totalFollow} quan tâm`}
                    </span>
                </span>
            </div>
        </Link>
    );
}

export default memo(SingerSearchItem);
