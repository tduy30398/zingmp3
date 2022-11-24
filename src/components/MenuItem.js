import { NavLink } from 'react-router-dom';

const activeStyle =
    'flex items-center h-10 px-[25px] py-2 text-[#FFFFFF] bg-[#5D3953] border-l-[3px] border-[#CA4974] text-[13px] font-bold';
const nonActiveStyle =
    'flex items-center h-10 px-[25px] py-2 text-[#DADADA] border-l-[3px] border-transparent text-[13px] font-bold';
function MenuItem({ to, icon, title }) {
    return (
        <NavLink className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to={to}>
            <span className="text-[#C4B6C0] mr-[10px]">{icon}</span>
            <span>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
