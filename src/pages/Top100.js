/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TabTitle } from '../utils';
import bgTop100 from '../assets/images/imgs/bg-top100.png';
import { setSearchText } from '../redux/actions';
import { PlaylistSectionTop100 } from '../components/Top100';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';

function Top100() {
    const { top100_1, top100_2, top100_3, top100_4, top100_5 } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('Top 100 | Tuyển tập nhạc hay chọn lọc');
        dispatch(setSearchText(''));
    }, []);

    return (
        <div className="w-full relative h-[calc(100vh-90px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {!top100_1 && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            <div className="relative">
                <img src={bgTop100} alt="cover" className="object-cover w-full h-[410px]" />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(65,22,54,0.92)]">
                    <div className="mt-[160px]">
                        <PlaylistSectionTop100 content={top100_1} />
                        <PlaylistSectionTop100 content={top100_2} />
                        <PlaylistSectionTop100 content={top100_3} />
                        <PlaylistSectionTop100 content={top100_4} />
                        <PlaylistSectionTop100 content={top100_5} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Top100;
