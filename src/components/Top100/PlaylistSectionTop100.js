import { PlaylistSectionItemTop100 } from '../Top100';
import { Link } from 'react-router-dom';

import { BsChevronRight } from '../../assets/icons/staticIcons';

function PlaylistSectionTop100({ content }) {
    return (
        <div className="w-full overflow-hidden px-[59px] mt-12">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    {content?.title && (
                        <div className="flex justify-between w-full">
                            <h3 className="text-text-color-2 mb-5 text-left font-bold text-xl capitalize">
                                {content?.title}
                            </h3>
                            {content?.sectionId === 'h100' && (
                                <Link
                                    to={content?.link}
                                    className="flex items-center text-text-color-3 gap-1 cursor-pointer hover:text-text-color-primary-2"
                                >
                                    <span className="text-xs font-medium mr-0.5">TẤT CẢ</span>
                                    <span className="mb-1">
                                        <BsChevronRight size={18} />
                                    </span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap items-start mx-[-14px]">
                    {content?.items?.map((item) => (
                        <PlaylistSectionItemTop100 key={item?.encodeId} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlaylistSectionTop100;
