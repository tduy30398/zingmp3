/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getDetailPlaylistApi } from '../apis';
import { TabTitle } from '../utils';
import { AlbumPlaylist, AudioLoading, RotatingLinesLoading } from '../components';
import { setAlbumSongs, setIsLoading } from '../redux/actions';
import { BsPlayCircle } from '../assets/icons';

function Album() {
    const { isPlaying, isLoading } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const [playlistDetail, setPlaylistDetail] = useState({});

    if (playlistDetail.title) {
        TabTitle(`${playlistDetail.title} | Album 320 lossless`);
    }

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(setIsLoading(true));
            const response = await getDetailPlaylistApi(playlistId);
            dispatch(setIsLoading(false));
            if (response?.data.err === 0) {
                setPlaylistDetail(response.data.data);
                dispatch(setAlbumSongs(response.data.data.song.items));
            }
        };
        fetchDetailPlaylist();
    }, [playlistId]);

    return (
        <div className="flex relative gap-8 px-[59px] pt-5 w-full h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {isLoading && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            {playlistDetail.artistsNames && (
                <div className="flex-none w-[29.5%] flex flex-col">
                    <div className="w-full relative">
                        <img
                            className={`w-full object-contain shadow-lg cursor-pointer ${
                                isPlaying
                                    ? `rounded-full animate-rotate-center`
                                    : `rounded-lg animate-rotate-center-pause`
                            }`}
                            src={playlistDetail?.thumbnailM}
                            alt={playlistDetail?.artistsNames}
                        />
                        <div
                            className={`absolute top-0 bottom-0 left-0 right-0 cursor-pointer group  ${
                                !isPlaying ? 'hover:bg-overlay-40' : ''
                            }`}
                        >
                            {isPlaying ? (
                                <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] p-[10px] border-[1px] border-[#FFFFFF] rounded-full">
                                    <AudioLoading height={'25'} width={'25'} color={'#FFFFFF'} />
                                </div>
                            ) : (
                                ''
                            )}
                            <div
                                className={`absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-text-color-2 opacity-0 ${
                                    !isPlaying ? 'group-hover:opacity-100' : ''
                                }`}
                            >
                                <BsPlayCircle size={45} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-center flex flex-col">
                        <h3 className="text-text-color-2 text-xl font-bold select-none">
                            {playlistDetail?.title}
                        </h3>
                        <span className="text-text-color-3 text-xs leading-5 select-none">{`Cập nhật: ${moment
                            .unix(playlistDetail?.contentLastUpdate)
                            .format('DD/MM/YYYY')}`}</span>
                        <span className="text-text-color-3 text-xs leading-5">
                            <span className="cursor-pointer hover:underline hover:text-text-color-primary-2">
                                {playlistDetail?.artistsNames}
                            </span>
                        </span>
                        <span className="text-text-color-3 text-xs leading-5 select-none">{`${Math.round(
                            playlistDetail?.like / 1000,
                        )}K người yêu thích`}</span>
                    </div>
                </div>
            )}
            {playlistDetail.artistsNames && (
                <div className="flex-auto flex flex-col">
                    {playlistDetail?.sortDescription && (
                        <div className="mb-[10px]">
                            <span className="text-text-color-3 text-sm leading-5">Lời tựa </span>
                            <span className="text-text-color-2 text-sm leading-5 font-medium">
                                {playlistDetail?.sortDescription}
                            </span>
                        </div>
                    )}
                    <AlbumPlaylist songs={playlistDetail?.song} />
                </div>
            )}
        </div>
    );
}

export default Album;
