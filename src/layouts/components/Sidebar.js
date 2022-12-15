import { Link } from 'react-router-dom';

import mainLogo from '../../assets/images/logos/main-logo.svg';
import { SongIcon, PlaylistIcon, HistoryIcon } from '../../assets/images/svgIcons';
import routes from '../../config';
import { SidebarItem } from '../../components';
import {
    MdOutlineLibraryMusic,
    TfiPieChart,
    HiOutlineChartBar,
    IoIosRadio,
    BsNewspaper,
    FiMusic,
    BiCategoryAlt,
    AiOutlineStar,
    BsCameraVideo,
    HiOutlinePlus,
} from '../../assets/icons';

function Sidebar() {
    return (
        <div className="w-[240px] h-[calc(100vh-90px)] flex-col bg-primary-color-4 fixed left-0 top-0">
            <div className="w-full h-[70px] pr-[25px] pl-7 flex items-center justify-start">
                <Link to={routes.home}>
                    <img src={mainLogo} alt="Logo" className="w-[120px] h-10" />
                </Link>
            </div>
            <div className="mb-[15px]">
                <SidebarItem
                    title="Cá Nhân"
                    to={routes.mymusic}
                    icon={<MdOutlineLibraryMusic size={24} />}
                />
                <SidebarItem title="Khám Phá" to={routes.home} icon={<TfiPieChart size={24} />} />
                <SidebarItem
                    title="#zingchart"
                    to={routes.zingchart}
                    icon={<HiOutlineChartBar size={24} />}
                />
                <SidebarItem title="Radio" to={routes.radio} icon={<IoIosRadio size={24} />} />
                <SidebarItem
                    title="Theo Dõi"
                    to={routes.following}
                    icon={<BsNewspaper size={24} />}
                />
            </div>
            <div className="w-[190px] h-[1px] border-border-color-1 mx-auto"></div>
            <div className="mt-[10px] h-[342px] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
                <SidebarItem title="Nhạc Mới" to={routes.new} icon={<FiMusic size={24} />} />
                <SidebarItem title="Thể Loại" to={routes.hub} icon={<BiCategoryAlt size={24} />} />
                <SidebarItem
                    title="Top 100"
                    to={routes.top100}
                    icon={<AiOutlineStar size={24} />}
                />
                <SidebarItem title="MV" to={routes.mv} icon={<BsCameraVideo size={24} />} />
                <div className="text-center bg-gradient-to-r from-[#5a4be7] to-[#c86dd7] my-[10px] mx-5 py-[15px] px-2 rounded-lg">
                    <div className="text-text-color-2 mb-[10px] text-xs font-extrabold leading-[1.67]">
                        Nghe nhạc không quảng cáo cùng kho nhạc VIP
                    </div>
                    <a
                        className="bg-[#ffdb00] border-[1px] border-[#ffdb00] py-[6px] px-[35px] text-xs font-bold rounded-full text-[#32323d] hover:bg-[#E6C500] hover:border-[#E6C500]"
                        href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=sidebar"
                        target="_blank"
                        rel="noreferrer"
                    >
                        NÂNG CẤP VIP
                    </a>
                </div>
                <div className="pt-[15px]">
                    <div className="mx-7 mb-2 font-bold text-xs text-text-color-2 ">THƯ VIỆN</div>
                    <SidebarItem title="Bài hát" to={routes.mysong} icon={<SongIcon />} />
                    <SidebarItem title="Playlist" to={routes.playlist} icon={<PlaylistIcon />} />
                    <SidebarItem title="Gần đây" to={routes.history} icon={<HistoryIcon />} />
                </div>
            </div>
            <div className="w-full h-[1px] border-border-color-1 mx-auto"></div>
            <div className="flex items-center h-[52px] text-text-color-2 hover:text-text-color-1 px-7 cursor-pointer">
                <span className="mr-[10px]">
                    <HiOutlinePlus size={19} />
                </span>
                <span className="text-[14px] font-bold">Tạo playlist mới</span>
            </div>
        </div>
    );
}

export default Sidebar;
