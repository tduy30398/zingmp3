/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { TabTitle } from '../utils';
import { setSearchText } from '../redux/actions';
import bgChart2 from '../assets/images/imgs/bg-chart-2.jpg';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import { WeekChartSong } from '../components/ZingChart';

const nonActiveStyle =
    'mr-10 py-[15px] cursor-pointer text-2xl font-bold text-text-color-1 hover:text-text-color-2 border-b-[3px] border-transparent';
const activeStyle =
    'mr-10 py-[15px] cursor-pointer text-2xl font-bold text-text-color-1 hover:text-text-color-2 border-b-[3px] border-[#CA4974]';

function WeekChart() {
    const { chartPageData } = useSelector((state) => state.app);
    const { title } = useParams();
    const [chartType, setChartType] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('#zingchart tuần, #zingchart Zing - Bài hát');
        dispatch(setSearchText(''));
    }, []);

    useEffect(() => {
        if (title === 'Bai-hat-Viet-Nam') {
            setChartType(chartPageData?.weekChart?.vn?.items);
        } else if (title === 'Bai-hat-US-UK') {
            setChartType(chartPageData?.weekChart?.us?.items);
        } else if (title === 'Bai-hat-KPop') {
            setChartType(chartPageData?.weekChart?.korea?.items);
        }
    }, [title]);

    return (
        <div className="w-full relative">
            {!chartPageData && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            <div className="relative">
                <img src={bgChart2} alt="cover" className="object-cover w-full h-[410px]" />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(65,22,54,0.7)]"></div>
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-[rgb(65,22,54)] to-transparent"></div>
                <div className="absolute top-0 bottom-2/3 left-[59px] right-[59px] flex flex-col mt-[100px]">
                    <h3 className="text-[40px] font-bold mb-[30px]">Bảng Xếp Hạng Tuần</h3>
                    <div className="flex items-center">
                        <NavLink
                            to={chartPageData?.weekChart?.vn?.link}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            VIỆT NAM
                        </NavLink>
                        <NavLink
                            to={chartPageData?.weekChart?.us?.link}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            US-UK
                        </NavLink>
                        <NavLink
                            to={chartPageData?.weekChart?.korea?.link}
                            className={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                        >
                            K-POP
                        </NavLink>
                    </div>
                    <div className="mt-10">
                        <div className="h-[calc(100vh-385px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
                            {chartType?.map((item, index) => (
                                <WeekChartSong songInfo={item} key={item?.encodeId} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeekChart;
