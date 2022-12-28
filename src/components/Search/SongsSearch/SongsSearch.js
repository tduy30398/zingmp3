import { useSelector } from 'react-redux';
import { SongSearchItem } from '../SongsSearch';

function SongsSearch() {
    const { searchResult } = useSelector((state) => state.music);
    return (
        <div className="w-full px-[59px] flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-xl font-bold mb-5">Bài Hát</h3>
                <div className="flex flex-col w-full">
                    {searchResult?.songs?.map((song) => (
                        <SongSearchItem key={song.encodeId} songInfo={song} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SongsSearch;
