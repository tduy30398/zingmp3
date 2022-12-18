import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsPlayCircle } from '../assets/icons';

function PlaylistSectionItem({ item }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-1 flex-auto w-1/5">
            <div className="w-full relative" onClick={() => navigate(item?.link)}>
                <img
                    className="w-full h-auto rounded-[5px] object-cover mb-1"
                    src={item.thumbnail}
                    alt={item.title}
                />
                <div className="absolute top-0 bottom-1 left-0 right-0 cursor-pointer group hover:bg-overlay-50">
                    <div
                        className={
                            'absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 opacity-0 group-hover:opacity-100'
                        }
                    >
                        <BsPlayCircle size={45} />
                    </div>
                </div>
            </div>
            {item.title && (
                <span
                    onClick={() => navigate(item?.link)}
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
