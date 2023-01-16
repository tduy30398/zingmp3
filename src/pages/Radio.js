/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { TabTitle } from '../utils';
import { setSearchText } from '../redux/actions';

function Radio() {
    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('Radio | Xem bài hát, album, MV đang hot nhất hiện tại');
        dispatch(setSearchText(''));
    }, []);

    return (
        <div className="w-full mt-[140px] h-[250px] text-text-color-3 rounded-lg bg-[#542E4B] flex items-center justify-center">
            Tín năng đang được phát triển, hãy quay lại sau...
        </div>
    );
}

export default Radio;
