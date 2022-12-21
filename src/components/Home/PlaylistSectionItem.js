import { useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsPlayCircle } from '../../assets/icons/staticIcons';

function PlaylistSectionItem({ item }) {
    const navigate = useNavigate();
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
        <div className="flex flex-col gap-1 flex-auto w-1/5">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full relative overflow-hidden rounded-[5px]"
                onClick={() => {
                    navigate(item?.link, { state: { isPlayAlbum: false } });
                }}
            >
                <img
                    ref={imgRef}
                    className="w-full h-auto object-cover mb-1"
                    src={item.thumbnail}
                    alt={item.title}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer group hover:bg-overlay-50">
                    <div
                        className={
                            'absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 opacity-0 group-hover:opacity-100'
                        }
                    >
                        <span className="hover:text-text-color-1">
                            <BsPlayCircle
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(item?.link, { state: { isPlayAlbum: true } });
                                }}
                                size={45}
                            />
                        </span>
                    </div>
                </div>
            </div>
            {item.title && (
                <span
                    onClick={() => {
                        navigate(item?.link, { state: { isPlayAlbum: false } });
                    }}
                    title={item.title}
                    className="text-text-color-2 text-sm font-bold cursor-pointer hover:text-text-color-primary-1"
                >
                    {item.title.length > 22 ? `${item.title.slice(0, 22)}...` : item.title}
                </span>
            )}
            <span className="text-text-color-3 text-sm font-medium overflow-ellipsis-2-line select-none">
                {item.sortDescription}
            </span>
        </div>
    );
}

export default memo(PlaylistSectionItem);
