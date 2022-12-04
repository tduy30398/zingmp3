import { useEffect } from 'react';

import { TabTitle } from '../utils';
import { Search } from '../layouts/components';
import { Slider } from '../components';

function Home() {
    useEffect(() => {
        TabTitle('Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV');
    }, []);
    return (
        <div className="ml-[240px] mr-[330px] h-[700px] bg-primary-color-2 flex flex-col">
            <Search />
            <div className="mt-[70px]">
                <Slider />
            </div>
        </div>
    );
}

export default Home;
