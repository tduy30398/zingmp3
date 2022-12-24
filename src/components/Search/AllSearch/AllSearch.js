import { useSelector } from 'react-redux';

import { SongSearchItem, SingerSearchItem } from '../AllSearch';
function AllSearch() {
    const { searchResult } = useSelector((state) => state.music);
    return (
        <div className="w-full px-[59px] flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-xl font-bold mb-5">Nổi Bật</h3>
                {searchResult?.top?.objectType === 'artist' ? (
                    <div className="flex w-full flex-wrap gap-x-7">
                        {searchResult?.artists
                            ?.filter((item, index) => index < 1)
                            ?.map((item) => (
                                <SingerSearchItem key={item?.id} data={item} />
                            ))}
                        {searchResult?.songs
                            ?.filter((item, index) => index < 2)
                            ?.map((item) => (
                                <SongSearchItem key={item?.encodeId} data={item} />
                            ))}
                    </div>
                ) : (
                    <div className="flex w-full flex-wrap gap-x-7">
                        {searchResult?.songs
                            ?.filter((item, index) => index < 3)
                            ?.map((item) => (
                                <SongSearchItem key={item?.encodeId} data={item} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllSearch;
