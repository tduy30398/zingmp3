/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import bgNewRelease from '../assets/images/imgs/bg-newrelease.jpg';
import { TabTitle } from '../utils';
import { setSearchText } from '../redux/actions';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import { ZingChartSong } from '../components/ZingChart';

function NewMusic() {
    const { newReleaseData, screenWidthRedux } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('#zingchart tuần, #zingchart Zing - Bài hát');
        dispatch(setSearchText(''));
    }, []);

    return (
        <div className="w-full relative h-[calc(100vh-90px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {!newReleaseData && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            <div className="relative">
                <img src={bgNewRelease} alt="cover" className="object-cover w-full h-[410px]" />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(65,22,54,0.92)]"></div>
                <div className="absolute top-0 bottom-2/3 left-[59px] right-[59px] flex items-end">
                    <h3 className="text-[40px] font-bold cursor-context-menu">Nhạc Mới</h3>
                </div>
                <div
                    className={`mt-5 absolute top-1/3 bottom-0 bg-gradient-to-t from-[rgb(65,22,54)] to-transparent ${
                        screenWidthRedux > 1022
                            ? 'left-[59px] right-[59px]'
                            : 'left-[29px] right-[29px]'
                    } `}
                >
                    <div className="pb-[50px]">
                        {newReleaseData?.items?.map((item, index) => (
                            <ZingChartSong songInfo={item} key={item?.encodeId} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewMusic;
