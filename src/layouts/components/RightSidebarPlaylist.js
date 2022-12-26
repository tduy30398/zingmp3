/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TfiAlarmClock, BiTrashAlt } from '../../assets/icons/staticIcons';
import { SongItemSmall } from '../../components/Home';
import { getDetailPlaylistAPI } from '../../APIs';

function RightSidebarPlaylist() {
    const { currentSongDetail, currentSongId, playlistId, isPlaying, recentSongsList } =
        useSelector((state) => state.music);
    const [isPlaylist, setIsPlaylist] = useState(true);
    const [playlistDetail, setPlaylistDetail] = useState({});

    const fetchDetailPlaylist = async () => {
        const response = await getDetailPlaylistAPI(playlistId);
        if (response?.data.err === 0) {
            setPlaylistDetail(response.data.data);
        }
    };

    useEffect(() => {
        playlistId && fetchDetailPlaylist();
    }, []);

    // Nếu đang ở nghe gần đây, bấm vào 1 bài hát sẽ quay về playlist
    useEffect(() => {
        isPlaying && setIsPlaylist(true);
    }, [isPlaying, currentSongId]);

    // Chỉ khi bài hát trong trang album được play thì mới render ra playlist đó
    useEffect(() => {
        if (playlistId && isPlaying) {
            fetchDetailPlaylist();
        }
    }, [isPlaying, currentSongId]);

    return (
        <div className="flex flex-col text-xs h-[calc(100vh-90px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            <div className="fixed top-0 left-0 right-0 z-10 bg-primary-color-2 h-[70px] flex-none w-full py-[14px] px-2 flex items-center justify-between gap-2">
                <div className="flex items-center bg-primary-color-5 w-full rounded-full p-[3px] cursor-pointer">
                    <span
                        className={`py-[6px] px-2 text-center flex-1 rounded-full ${
                            isPlaylist
                                ? 'font-semibold bg-[#886D81]'
                                : 'text-[#DADADA] font-medium hover:text-text-color-2'
                        }`}
                        onClick={() => setIsPlaylist(true)}
                    >
                        Danh sách phát
                    </span>
                    <span
                        className={`py-[6px] px-2 text-center flex-1 rounded-full ${
                            !isPlaylist
                                ? 'font-semibold bg-[#886D81]'
                                : 'font-medium text-[#DADADA] hover:text-text-color-2'
                        }`}
                        onClick={() => setIsPlaylist(false)}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <div className="flex gap-2">
                    <span className="p-2 bg-primary-color-8 hover:text-text-color-1 rounded-full cursor-pointer">
                        <TfiAlarmClock size={18} />
                    </span>
                    <span
                        title="Xóa danh sách nghe gần đây"
                        className="p-2 bg-primary-color-8 hover:text-text-color-1 rounded-full cursor-pointer"
                    >
                        <BiTrashAlt size={18} />
                    </span>
                </div>
            </div>
            {isPlaylist ? (
                <div className="flex flex-col w-full px-2 mt-[70px]">
                    <SongItemSmall data={currentSongDetail} />
                    <div className="flex flex-col pt-[15px] pb-[5px] px-2 gap-1">
                        <span className="text-sm font-bold">Tiếp theo</span>
                        <span>
                            <span className="text-sm font-normal text-text-color-3">
                                Từ playlist{' '}
                            </span>
                            <Link
                                to={currentSongDetail?.album?.link}
                                className="text-sm font-normal cursor-pointer text-text-color-primary-2"
                            >
                                {playlistDetail?.title?.length > 28
                                    ? `${playlistDetail?.title?.slice(0, 28)}...`
                                    : playlistDetail?.title}
                            </Link>
                        </span>
                    </div>
                    {playlistDetail?.song?.items
                        ?.filter((item) => item.encodeId !== currentSongDetail.encodeId)
                        ?.map((item) => (
                            <SongItemSmall data={item} key={item.encodeId} />
                        ))}
                </div>
            ) : (
                <div className="flex flex-col w-full px-2 mt-[70px]">
                    {recentSongsList?.map((song) => (
                        <SongItemSmall data={song} key={song.encodeId} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RightSidebarPlaylist;
