/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TabTitle } from '../utils';
import {
    Slider,
    NewRelease,
    PlaylistSection,
    WeekChartSection,
    ChartSection
} from '../components/Home';
import { setSearchText, setSearchResult } from '../redux/actions';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';

function Home() {
    const {
        newRelease,
        hArtistTheme,
        hAutoTheme1,
        hAutoTheme2,
        weekChart,
        h100,
        hXone,
        hAlbum,
        screenWidthRedux
    } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV');
        dispatch(setSearchText(''));
        dispatch(setSearchResult({}));
    }, []);

    return (
        <div className="w-full relative pb-10 mt-[70px] h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {Object.keys(newRelease).length === 0 ? (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            ) : (
                ''
            )}
            <Slider />
            <NewRelease />
            <PlaylistSection content={hArtistTheme} />
            <PlaylistSection content={hAutoTheme1} />
            <PlaylistSection content={hAutoTheme2} />
            <ChartSection />
            <div
                className={`w-full px-[59px] mt-12 ${
                    screenWidthRedux > 768 ? 'flex' : 'flex-col'
                } items-center gap-7`}
            >
                {weekChart?.map((item) => (
                    <WeekChartSection data={item} key={item.link} />
                ))}
            </div>
            <PlaylistSection content={h100} />
            <PlaylistSection content={hXone} />
            <PlaylistSection content={hAlbum} />
        </div>
    );
}

export default Home;
