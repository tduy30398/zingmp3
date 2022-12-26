/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    SongSearchItem,
    SingerSearchItem,
    SongItemSearchSmall,
    PlaylistSectionSearchItem,
    Artist,
} from '../AllSearch';
import { setIsSearching, setSearchResult } from '../../../redux/actions';
import { searchAPI } from '../../../APIs';
import { BsChevronRight } from '../../../assets/icons/staticIcons';

function AllSearch() {
    const { searchResult } = useSelector((state) => state.music);
    const [queryParams] = useSearchParams();
    const dispatch = useDispatch();
    const searchParams = queryParams.get('q');

    useEffect(() => {
        const getSearchAPI = async () => {
            dispatch(setIsSearching(true));
            dispatch(setSearchResult({}));
            const respone = await searchAPI(searchParams);
            dispatch(setIsSearching(false));
            if (respone?.data.err === 0) {
                dispatch(setSearchResult(respone.data.data));
            }
        };
        getSearchAPI();
    }, [searchParams]);

    return (
        <div className="w-full px-[59px] flex flex-col">
            {(searchResult?.songs || searchResult?.artists) && (
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
            )}
            {searchResult?.songs && (
                <div className="flex flex-col mt-[30px]">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xl font-bold">Bài Hát</h3>
                        <div className="flex items-center text-text-color-3 gap-1 cursor-pointer hover:text-text-color-primary-2">
                            <span className="text-xs font-medium mr-[2px]">TẤT CẢ</span>
                            <span className="mb-1">
                                <BsChevronRight size={18} />
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap gap-x-7">
                        {searchResult?.songs
                            ?.filter((item, index) => index < 6)
                            ?.map((item) => (
                                <SongItemSearchSmall key={item?.encodeId} data={item} />
                            ))}
                    </div>
                </div>
            )}
            {searchResult?.playlists && (
                <div className="flex flex-col mt-[30px]">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xl font-bold">Playlist/Album</h3>
                        <div className="flex items-center text-text-color-3 gap-1 cursor-pointer hover:text-text-color-primary-2">
                            <span className="text-xs font-medium mr-[2px]">TẤT CẢ</span>
                            <span className="mb-1">
                                <BsChevronRight size={18} />
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-start gap-7">
                        {searchResult?.playlists
                            ?.filter((item, index) => index < 5)
                            ?.map((item) => (
                                <PlaylistSectionSearchItem key={item?.encodeId} item={item} />
                            ))}
                    </div>
                </div>
            )}
            {searchResult?.artists && (
                <div className="flex flex-col mt-[30px]">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xl font-bold">Nghệ sĩ/OA</h3>
                        <div className="flex items-center text-text-color-3 gap-1 cursor-pointer hover:text-text-color-primary-2">
                            <span className="text-xs font-medium mr-[2px]">TẤT CẢ</span>
                            <span className="mb-1">
                                <BsChevronRight size={18} />
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-7">
                        {searchResult?.artists
                            ?.filter((item, index) => index < 5)
                            ?.map((item) => (
                                <Artist key={item?.id} item={item} />
                            ))}
                    </div>
                </div>
            )}
            {searchResult?.songs || searchResult?.artists || searchResult?.playlists ? (
                ''
            ) : (
                <div className="w-full h-[250px] text-text-color-3 rounded-lg bg-[#542E4B] flex items-center justify-center">
                    Không có kết quả được tìm thấy, hãy thử lại...
                </div>
            )}
        </div>
    );
}

export default AllSearch;
