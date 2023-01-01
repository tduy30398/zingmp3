/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { TabTitle } from '../utils';
import { getSingerAPI } from '../APIs';
import { setSearchText } from '../redux/actions';
import {
    AiOutlineUserAdd,
    BsFillPlayFill,
    BsChevronRight,
    FaPlay,
} from '../assets/icons/staticIcons';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import { SongItemSearchSmall, Artist } from '../components/Search/AllSearch';
import { PlaylistSectionSinger } from '../components/Singer';

function Singer() {
    const { singerName } = useParams();
    const dispatch = useDispatch();
    const imgRef = useRef('');

    const [singerDetail, setSingerDetail] = useState({});

    singerDetail?.name && TabTitle(`${singerDetail?.name} - Zing MP3 Official Account`);

    useEffect(() => {
        const fetchSingerDetail = async () => {
            setSingerDetail({});
            const response = await getSingerAPI(singerName);
            if (response?.data?.err === 0) {
                setSingerDetail(response.data.data);
            }
        };
        fetchSingerDetail();
    }, [singerName]);

    useEffect(() => {
        dispatch(setSearchText(''));
    }, []);

    const handleMouseEnter = () => {
        imgRef.current.classList.remove('animate-scale-down-image');
        imgRef.current.classList.add('animate-scale-up-image');
    };

    const handleMouseLeave = () => {
        imgRef.current.classList.remove('animate-scale-up-image');
        imgRef.current.classList.add('animate-scale-down-image');
    };

    const singerAlbum = singerDetail?.sections?.find((section) => section?.title === 'Single & EP');
    const singerAlbum2 = singerDetail?.sections?.find((section) => section?.title === 'Tuyển tập');
    const singerAlbum3 = singerDetail?.sections?.find(
        (section) => section?.title === 'Xuất hiện trong',
    );
    const suggestions = singerDetail?.sections?.find(
        (section) => section?.title === 'Bạn Có Thể Thích',
    );

    console.log(singerDetail);

    return (
        <div className="w-full flex flex-col relative h-[calc(100vh-90px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {!singerDetail?.cover && (
                <div className="absolute left-0 right-0 top-[-70px] bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}

            <div className="relative">
                <img
                    src={singerDetail?.cover}
                    alt="cover"
                    className="object-cover w-full h-[410px] mt-[-70px]"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
                    <div className="absolute bottom-6 px-[59px] w-full flex flex-col">
                        <div className="flex items-center mb-4">
                            <span className="text-6xl font-bold">{singerDetail?.name}</span>
                            <span className="ml-5 p-1 rounded-full cursor-pointer bg-primary-color-7 text-text-color-primary-1 hover:bg-primary-color-1 hover:text-text-color-2">
                                <BsFillPlayFill className="pl-1" size={44} />
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-6 text-sm font-medium text-[#FEFFFFCC]">
                                {`${singerDetail?.totalFollow
                                    ?.toString()
                                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                 người quan tâm`}
                            </span>
                            <span className="py-[6px] px-[19px] cursor-pointer leading-[14px] flex outline-none text-center rounded-full border text-text-color-2 text-xs border-[rgba(254,255,255,.2)] font-medium bg-[rgba(254,255,255,.1)] hover:text-text-color-1 hover:bg-[rgba(254,255,255,.15)]">
                                <span className="mr-1">
                                    <AiOutlineUserAdd size={15} />
                                </span>
                                <span>QUAN TÂM</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full px-[59px] flex flex-col">
                <div className="flex mt-[30px] mx-[-14px]">
                    {singerDetail?.topAlbum?.thumbnail && (
                        <div className="flex flex-col flex-1 px-[14px]">
                            <h3 className="text-xl font-bold mb-5">Mới Phát Hành</h3>
                            <Link
                                to={singerDetail?.topAlbum?.link}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="flex p-4 bg-primary-color-8 rounded-[12px] cursor-pointer group"
                            >
                                <div className="w-[151px] h-[151px] shrink-0 relative overflow-hidden">
                                    <img
                                        ref={imgRef}
                                        src={singerDetail?.topAlbum?.thumbnail}
                                        alt="banner"
                                        className="w-full h-full object-cover rounded-[5px]"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-overlay-40 rounded-[5px] hidden group-hover:block">
                                        <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 p-3 border-[1px] border-[#FFFFFF] rounded-full">
                                            <FaPlay size={20} className="ml-[2px]" />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col my-[6px] ml-[16px] gap-3">
                                    <span className="text-xs text-text-color-3 font-medium">
                                        {singerDetail?.topAlbum?.textType}
                                    </span>
                                    <span className="overflow-ellipsis-2-line text-sm text-text-color-2 font-bold leading-[18px]">
                                        {singerDetail?.topAlbum?.title}
                                    </span>
                                    <span className="text-xs text-text-color-3 font-medium">
                                        <span className=" hover:underline hover:text-text-color-primary-1">
                                            {singerDetail?.topAlbum?.artistsNames}
                                        </span>
                                    </span>
                                    <span className="text-xs text-text-color-3 font-medium">
                                        {singerDetail?.topAlbum?.releaseDate}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )}
                    <div className="flex flex-col flex-2 px-[14px]">
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
                            {singerDetail?.sections
                                ?.find((section) => section.sectionType === 'song')
                                .items?.filter((item, index) => index < 6)
                                ?.map((item) => (
                                    <SongItemSearchSmall key={item?.encodeId} data={item} />
                                ))}
                        </div>
                    </div>
                </div>
                {singerAlbum && <PlaylistSectionSinger content={singerAlbum} />}
                {singerAlbum2 && <PlaylistSectionSinger content={singerAlbum2} />}
                {singerAlbum3 && <PlaylistSectionSinger content={singerAlbum3} />}
                {suggestions && (
                    <div className="flex flex-col mt-[30px]">
                        <h3 className="text-xl font-bold mb-5">Có Thể Bạn Sẽ Thích</h3>
                        <div className="flex items-start gap-7">
                            {suggestions?.items
                                ?.filter((item, index) => index < 5)
                                ?.map((item) => (
                                    <Artist key={item?.id} item={item} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Singer;
