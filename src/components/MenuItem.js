import { NavLink } from 'react-router-dom';

const activeStyle =
    'flex items-center h-10 px-[25px] py-2 text-text-color-2 border-border-color-1 border-l-[3px] border-[#CA4974] text-[13px] font-bold';
const nonActiveStyle =
    'flex items-center h-10 px-[25px] py-2 text-text-color-1 hover:text-text-color-2 border-l-[3px] border-transparent text-[13px] font-bold';
function MenuItem({ to, icon, title }) {
    return (
        <NavLink
            title={title}
            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to={to}
        >
            <span className="mr-[10px]">{icon}</span>
            <span>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
