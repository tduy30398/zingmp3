import { useSelector } from 'react-redux';

import { AlbumSearchItem } from '../AlbumsSearch';

function AlbumsSearch() {
    const { searchResult } = useSelector((state) => state.music);
    const { screenWidthRedux } = useSelector((state) => state.app);
    return (
        <div
            className={`w-full flex flex-col ${
                screenWidthRedux > 1022 ? 'px-[59px]' : 'px-[29px]'
            }`}
        >
            {searchResult?.playlists && (
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold mb-5">Playlist/Album</h3>
                    <div className="flex flex-wrap items-start mx-[-14px]">
                        {searchResult?.playlists?.map((playlist) => (
                            <AlbumSearchItem key={playlist.encodeId} item={playlist} />
                        ))}
                    </div>
                </div>
            )}
            {searchResult?.playlists ? (
                ''
            ) : (
                <div className="w-full h-[250px] text-text-color-3 rounded-lg bg-[#542E4B] flex items-center justify-center">
                    Không có kết quả được tìm thấy, hãy thử lại...
                </div>
            )}
        </div>
    );
}

export default AlbumsSearch;
