/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getDetailPlaylistApi } from '../apis';
import { TabTitle } from '../utils';
import { AlbumPlaylist } from '../components';
import { setAlbumSongs } from '../redux/actions';

function Album() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const [playlistDetail, setPlaylistDetail] = useState({});

    if (playlistDetail.title) {
        TabTitle(`${playlistDetail.title} | Album 320 lossless`);
    }

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await getDetailPlaylistApi(playlistId);
            if (response?.data.err === 0) {
                setPlaylistDetail(response.data.data);
                dispatch(setAlbumSongs(response.data.data.song.items));
            }
        };
        fetchDetailPlaylist();
    }, [playlistId]);

    return (
        <div className="flex gap-8 px-[59px] pt-5 w-full h-[calc(100vh-160px)] overflow-x-hidden overflow-y-scroll overflow-y-overlay scrollbar">
            {playlistDetail.artistsNames && (
                <div className="flex-none w-[29.5%] flex flex-col">
                    <img
                        className="w-full object-contain rounded-lg shadow-lg cursor-pointer"
                        src={playlistDetail?.thumbnailM}
                        alt={playlistDetail?.artistsNames}
                    />
                    <div className="mt-3 text-center flex flex-col">
                        <h3 className="text-text-color-2 text-xl font-bold select-none">
                            {playlistDetail?.title}
                        </h3>
                        <span className="text-text-color-3 text-xs leading-5 select-none">{`Cập nhật: ${moment
                            .unix(playlistDetail?.contentLastUpdate)
                            .format('DD/MM/YYYY')}`}</span>
                        <span className="text-text-color-3 text-xs leading-5">
                            {playlistDetail?.artistsNames}
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
