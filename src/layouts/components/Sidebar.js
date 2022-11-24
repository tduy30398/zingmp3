import { Link } from 'react-router-dom';

import logo1 from '../../assets/images/logos/main-logo.svg';
import routes from '../../config';
import { MenuItem } from '../../components';
import {
    MdOutlineLibraryMusic,
    BsPieChart,
    GiChart,
    BiRadio,
    BsNewspaper,
} from '../../assets/icons';

function Sidebar() {
    return (
        <div className="w-[240px] flex-col bg-primary-color-4">
            <div className="w-full h-[70px] pr-[25px] pl-7 flex items-center justify-start">
                <Link to={routes.home}>
                    <img src={logo1} alt="Logo" className="w-[120px] h-10" />
                </Link>
            </div>
            <div className="mb-[15px]">
                <MenuItem
                    title="Cá Nhân"
                    to={routes.mymusic}
                    icon={<MdOutlineLibraryMusic size={24} />}
                />
                <MenuItem title="Khám Phá" to={routes.home} icon={<BsPieChart size={24} />} />
                <MenuItem title="#zingchart" to={routes.zingchart} icon={<GiChart size={24} />} />
                <MenuItem title="Radio" to={routes.radio} icon={<BiRadio size={24} />} />
                <MenuItem title="Theo Dõi" to={routes.following} icon={<BsNewspaper size={24} />} />
            </div>
            <div className="w-[190px] h-[1px] bg-[#5D3953] mx-auto"></div>
        </div>
    );
}

export default Sidebar;
