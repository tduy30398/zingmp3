import { PlaylistSectionItem } from '../Home';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsChevronRight } from '../../assets/icons/staticIcons';

function PlaylistSection({ content }) {
    const { screenWidthRedux } = useSelector((state) => state.app);

    return (
        <div
            className={`w-full overflow-hidden mt-12 ${
                screenWidthRedux > 1022 ? 'px-[59px]' : 'px-[29px]'
            }`}
        >
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
                <div className="flex mx-[-14px]">
                    {content?.items
                        ?.filter(
                            (item, index) =>
                                index <
                                (screenWidthRedux >= 1280
                                    ? 5
                                    : screenWidthRedux >= 1024
                                    ? 4
                                    : screenWidthRedux >= 768
                                    ? 3
                                    : 2)
                        )
                        ?.map((item) => (
                            <PlaylistSectionItem key={item?.encodeId} item={item} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default PlaylistSection;
