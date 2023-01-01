/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getDetailPlaylistAPI } from '../APIs';
import { TabTitle } from '../utils';
import { AlbumPlaylist } from '../components/Home';
import { AudioLoading, RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import { BsPlayCircle } from '../assets/icons/staticIcons';
import { setAlbumSongs, setIsLoading, setPlaylistId } from '../redux/actions';

function Album() {
    const { isPlaying, isLoading } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const [playlistDetail, setPlaylistDetail] = useState({});
    const imgRef = useRef('');

    playlistDetail.title && TabTitle(`${playlistDetail.title} | Album 320 lossless`);

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(setIsLoading(true));
            setPlaylistDetail({});
            const response = await getDetailPlaylistAPI(playlistId);
            dispatch(setIsLoading(false));
            if (response?.data.err === 0) {
                setPlaylistDetail(response.data.data);
                dispatch(setAlbumSongs(response.data.data.song.items));
                dispatch(setPlaylistId(playlistId));
            }
        };
        fetchDetailPlaylist();
    }, [playlistId]);

    const handleMouseEnter = () => {
        imgRef.current.classList.remove('animate-scale-down-image');
        imgRef.current.classList.remove('animate-rotate-center-pause');
        imgRef.current.classList.add('animate-scale-up-image');
    };

    const handleMouseLeave = () => {
        imgRef.current.classList.remove('animate-scale-up-image');
        imgRef.current.classList.add('animate-scale-down-image');
    };

    return (
        <div className="flex relative gap-8 px-[59px] mt-[70px] w-full h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {isLoading && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            {playlistDetail.artistsNames && (
                <div className="flex-none w-[29.5%] flex flex-col">
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="w-full relative overflow-hidden rounded-lg"
                    >
                        <img
                            ref={imgRef}
                            className={`w-full object-cover shadow-lg cursor-pointer ${
                                isPlaying
                                    ? `rounded-full animate-rotate-center`
                                    : `animate-rotate-center-pause`
                            }`}
                            src={
                                playlistDetail?.thumbnailM ||
                                `https://avatar.talk.zdn.vn/default.jpg`
                            }
                            alt={playlistDetail?.artistsNames}
                        />
                        <div
                            className={`absolute top-0 bottom-0 left-0 right-0 cursor-pointer group ${
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
