import { useSelector } from 'react-redux';

function MusicPlayer() {
    const { currentSongId } = useSelector((state) => state.music);

    return (
        <div className="fixed bottom-0 h-[90px] w-full bg-primary-color-3 z-50">
            <div className="border-t-[1px] border-[#5D3953] px-5 flex">
                <div className="w-[30%] flex-auto">Detail Song</div>
                <div className="w-[40%] flex-auto">Main Player</div>
                <div className="w-[30%] flex-auto">Volume</div>
            </div>
        </div>
    );
}

export default MusicPlayer;
