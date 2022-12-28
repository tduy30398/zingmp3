import { useSelector } from 'react-redux';

import { AlbumSearchItem } from '../AlbumsSearch';

function AlbumsSearch() {
    const { searchResult } = useSelector((state) => state.music);
    return (
        <div className="w-full px-[59px] flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-xl font-bold mb-5">Playlist/Album</h3>
                <div className="flex flex-wrap items-start mx-[-14px]">
                    {searchResult?.playlists?.map((playlist) => (
                        <AlbumSearchItem key={playlist.encodeId} item={playlist} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AlbumsSearch;
