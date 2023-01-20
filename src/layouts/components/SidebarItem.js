import { NavLink } from 'react-router-dom';

const activeStyle =
    'flex items-center justify-center lg:justify-start h-10 px-[25px] py-2 text-[13px] font-bold lg:border-l-[3px] text-text-color-2 border-border-color-3 bg-[#94507B] lg:bg-[#5D3954]';
const nonActiveStyle =
    'flex items-center justify-center lg:justify-start h-10 px-[25px] py-2 text-[13px] font-bold lg:border-l-[3px] text-text-color-1 border-transparent hover:text-text-color-2';
function SidebarItem({ to, icon, title }) {
    return (
        <NavLink
            title={title}
            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to={to}
        >
            <span className="mr-0 lg:mr-[10px]">{icon}</span>
            <span className="hidden lg:inline">{title}</span>
        </NavLink>
    );
}

export default SidebarItem;
