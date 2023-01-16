/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { TabTitle } from '../utils';
import { setSearchText } from '../redux/actions';

function MV() {
    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('Video | Tuyển tập nhạc hay chọn lọc');
        dispatch(setSearchText(''));
    }, []);

    return (
        <div className="w-full mt-[140px] h-[250px] text-text-color-3 rounded-lg bg-[#542E4B] flex items-center justify-center">
            Tín năng đang được phát triển, hãy quay lại sau...
        </div>
    );
}

export default MV;
