import { useEffect } from 'react';

import { TabTitle } from '../utils';
import { Slider } from '../components';

function Home() {
    useEffect(() => {
        TabTitle('Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV');
    }, []);
    return (
        <div className="overflow-y-auto w-full">
            <Slider />
        </div>
    );
}

export default Home;
