import { Link } from 'react-router-dom';

import mainLogo from '../../assets/images/logos/main-logo.svg';
import smallLogo from '../../assets/images/logos/small-logo.svg';
import { SongIcon, PlaylistIcon, HistoryIcon } from '../../assets/images/svgIcons';
import paths from '../../configs';
import { SidebarItem } from '../components';
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
    HiOutlinePlus
} from '../../assets/icons/staticIcons';

function Sidebar() {
    return (
        <div className="w-[70px] lg:w-[240px] h-[calc(100vh-90px)] flex-col bg-[#883C6C] lg:bg-primary-color-4 fixed left-0 top-0">
            <div className="w-full h-[70px] lg:pr-[25px] lg:pl-7 flex items-center justify-center lg:justify-start">
                <Link to={paths.HOME}>
                    <img src={mainLogo} alt="Logo" className="w-[120px] h-10 hidden lg:block" />
                    <img
                        src={smallLogo}
                        alt="Logo"
                        className="w-[45px] h-[45px] object-cover block lg:hidden"
                    />
                </Link>
            </div>
            <div className="pb-[15px] border-b-[1px] border-[#94507B] lg:border-border-color-1">
                <SidebarItem
                    title="Cá Nhân"
                    to={paths.MYMUSIC}
                    icon={<MdOutlineLibraryMusic size={22} />}
                />
                <SidebarItem title="Khám Phá" to={paths.HOME} icon={<TfiPieChart size={22} />} />
                <SidebarItem
                    title="#zingchart"
                    to={paths.ZINGCHART}
                    icon={<HiOutlineChartBar size={22} />}
                />
                <SidebarItem title="Radio" to={paths.RADIO} icon={<IoIosRadio size={22} />} />
                <SidebarItem
                    title="Theo Dõi"
                    to={paths.FOLLOWING}
                    icon={<BsNewspaper size={22} />}
                />
            </div>
            <div className="w-[190px] h-[1px] border-border-color-1 mx-auto"></div>
            <div className="mt-[10px] h-[342px] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
                <SidebarItem title="Nhạc Mới" to={paths.NEW} icon={<FiMusic size={22} />} />
                <SidebarItem title="Thể Loại" to={paths.HUB} icon={<BiCategoryAlt size={22} />} />
                <SidebarItem title="Top 100" to={paths.TOP100} icon={<AiOutlineStar size={22} />} />
                <SidebarItem title="MV" to={paths.MV} icon={<BsCameraVideo size={22} />} />
                <div className="text-center bg-gradient-to-r from-[#5a4be7] to-[#c86dd7] my-[10px] mx-5 py-[15px] px-2 rounded-lg hidden lg:block">
                    <div className="text-text-color-2 mb-[10px] text-xs font-extrabold leading-[1.67]">
                        Nghe nhạc không quảng cáo cùng kho nhạc VIP
                    </div>
                    <a
                        className="bg-[#ffdb00] border-[1px] border-[#ffdb00] py-1.5 px-[35px] text-xs font-bold rounded-full text-[#32323d] hover:bg-[#E6C500] hover:border-[#E6C500]"
                        href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=sidebar"
                        target="_blank"
                        rel="noreferrer"
                    >
                        NÂNG CẤP VIP
                    </a>
                </div>
                <div className="pt-[15px]">
                    <div className="mx-7 mb-2 font-bold text-xs text-text-color-2 hidden lg:block">
                        THƯ VIỆN
                    </div>
                    <SidebarItem title="Bài hát" to={paths.MYSONG} icon={<SongIcon />} />
                    <SidebarItem title="Playlist" to={paths.PLAYLIST} icon={<PlaylistIcon />} />
                    <SidebarItem title="Gần đây" to={paths.HISTORY} icon={<HistoryIcon />} />
                </div>
            </div>
            <div className="w-full h-[1px] border-border-color-1 mx-auto"></div>
            <div className="hidden lg:flex items-center h-[52px] text-text-color-2 hover:text-text-color-1 px-7 cursor-pointer">
                <span className="mr-[10px]">
                    <HiOutlinePlus size={19} />
                </span>
                <span className="text-[14px] font-bold">Tạo playlist mới</span>
            </div>
        </div>
    );
}

export default Sidebar;
