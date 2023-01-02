import { useSelector } from 'react-redux';
import { SongSearchItem } from '../SongsSearch';

function SongsSearch() {
    const { searchResult } = useSelector((state) => state.music);
    return (
        <div className="w-full px-[59px] flex flex-col">
            {searchResult?.songs && (
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold mb-5">Bài Hát</h3>
                    <div className="flex flex-col w-full">
                        {searchResult?.songs?.map((song) => (
                            <SongSearchItem key={song.encodeId} songInfo={song} />
                        ))}
                    </div>
                </div>
            )}
            {searchResult?.songs ? (
                ''
            ) : (
                <div className="w-full h-[250px] text-text-color-3 rounded-lg bg-[#542E4B] flex items-center justify-center">
                    Không có kết quả được tìm thấy, hãy thử lại...
                </div>
            )}
        </div>
    );
}

export default SongsSearch;
