import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TabTitle } from '../utils';
import { Slider, NewRelease } from '../components';
import { PlaylistSection } from '../layouts/components';
import { RotatingLinesLoading } from '../components';

function Home() {
    useEffect(() => {
        TabTitle('Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV');
    }, []);
    const { newRelease, hArtistTheme, hAutoTheme1, hAutoTheme2, h100, hXone, hAlbum } = useSelector(
        (state) => state.app,
    );
    return (
        <div className="w-full relative h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
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
            <PlaylistSection content={h100} />
            <PlaylistSection content={hXone} />
            <PlaylistSection content={hAlbum} />
        </div>
    );
}

export default Home;
