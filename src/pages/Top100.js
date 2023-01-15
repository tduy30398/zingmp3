/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TabTitle } from '../utils';
import { setTop100, setSearchText } from '../redux/actions';
import { getTop100API } from '../APIs';
import { PlaylistSectionTop100 } from '../components/Top100';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';

function Top100() {
    TabTitle('Top 100 | Tuyển tập nhạc hay chọn lọc');
    const { top100_1, top100_2, top100_3, top100_4, top100_5 } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTop100API = async () => {
            dispatch(setTop100(null));
            const response = await getTop100API();
            dispatch(setTop100(response.data.data));
        };
        fetchTop100API();
        dispatch(setSearchText(''));
    }, []);

    return (
        <div className="w-full relative mt-[70px] h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {!top100_1 ? (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            ) : (
                ''
            )}
            <PlaylistSectionTop100 content={top100_1} />
            <PlaylistSectionTop100 content={top100_2} />
            <PlaylistSectionTop100 content={top100_3} />
            <PlaylistSectionTop100 content={top100_4} />
            <PlaylistSectionTop100 content={top100_5} />
        </div>
    );
}

export default Top100;
