import { useEffect, useState } from 'react';
import axios from 'axios';

import { TabTitle } from '../utils';
import { Search } from '../layouts/components';

function Home() {
    const [sliderBanners, setSliderBanners] = useState([]);

    useEffect(() => {
        TabTitle('Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV');
        const getUser = async () => {
            try {
                const response = await axios.get('https://zingmp3-api-mu.vercel.app/api/home');
                setSliderBanners(response.data.data.items[0].items);
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, []);
    console.log(sliderBanners);
    return (
        <div className="ml-[240px] mr-[330px] h-[700px] bg-primary-color-2 flex flex-col">
            <Search />
        </div>
    );
}

export default Home;
