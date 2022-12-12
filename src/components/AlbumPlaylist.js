import AlbumSong from './AlbumSong';
import { memo } from 'react';
import moment from 'moment';

import { BsSortDownAlt } from '../assets/icons';

function AlbumPlaylist({ songs }) {
    return (
        <div className="w-full flex flex-col text-text-color-3">
            {songs && (
                <div className="flex p-[10px] border-b-[1px] border-border-color-2">
                    <div className="flex flex-5">
                        <span className="mr-[10px] cursor-pointer hover:opacity-70">
                            <BsSortDownAlt />
                        </span>
                        <span className="text-xs font-medium leading-5 select-none">BÀI HÁT</span>
                    </div>
                    <span className="text-xs font-medium leading-5 select-none flex-4">ALBUM</span>
                    <span className="text-xs font-medium leading-5 select-none flex-1">
                        THỜI GIAN
                    </span>
                </div>
            )}
            {songs && (
                <div className="flex flex-col mb-[10px]">
                    {songs.items.map((song) => (
                        <AlbumSong key={song.encodeId} songInfo={song} />
                    ))}
                </div>
            )}
            {songs && (
                <div className="flex text-xs font-medium">
                    <h3 className="mr-2">{`${songs.total} bài hát`}</h3>•
                    <h3 className="ml-2">
                        {moment.utc(songs.totalDuration * 1000).format('H giờ mm ')}phút
                    </h3>
                </div>
            )}
        </div>
    );
}

export default memo(AlbumPlaylist);
