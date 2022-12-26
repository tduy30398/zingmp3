import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getSingerAPI } from '../APIs';

function Singer() {
    const { singerName } = useParams();
    useEffect(() => {
        const fetchSingerDetail = async () => {
            const response = await getSingerAPI(singerName);
            console.log(response);
        };
        fetchSingerDetail();
    }, [singerName]);
    return <div className="">SINGER</div>;
}

export default Singer;
